import { Either, failure, success } from '@/core/types/either';
import { Optional } from '@/core/types/optional';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { Injectable } from '@nestjs/common';
import { User, UserProps } from '../../enterprise/entities/user';
import { HashGenerator } from '../cryptography/hash-generator';
import { UserRepository } from '../repositories/user-repository';
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error';

export interface CreateUserInput
  extends Optional<UserProps, 'createdAt' | 'slug' | 'id'> {}

type CreateUserOutput = Either<{ user: User }, ResourceAlreadyExistsError>;

@Injectable()
export class CreateUserUseCase extends BaseUseCase<
  CreateUserInput,
  CreateUserOutput
> {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {
    super();
  }

  public async execute(params: CreateUserInput): Promise<CreateUserOutput> {
    const userProps = params;

    const userWithSameEmail = await this.userRepository.findByEmail({
      email: params.email,
    });

    if (userWithSameEmail.item) {
      return failure(new ResourceAlreadyExistsError('e-mail'));
    }

    const hashedPassword = await this.hashGenerator.hash(userProps.password);

    Object.assign(userProps, {
      ...userProps,
      password: hashedPassword,
    });

    const user = User.create(userProps);

    const newUserProps: CreateUserInput = {
      ...userProps,
      id: user.getId(),
      slug: user.getSlug(),
      createdAt: user.getCreatedAt(),
    };

    await this.userRepository.create({ data: newUserProps });

    return success({ user });
  }
}
