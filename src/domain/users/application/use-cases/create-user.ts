import { Optional } from '@/core/types/optional';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { hash } from 'bcrypt';
import { User, UserProps } from '../../enterprise/entities/user';
import { UserRepository } from '../repositories/user-repository';

export interface CreateUserInput
  extends Optional<UserProps, 'createdAt' | 'slug' | 'id'> {}

export interface CreateUserOutput {
  user: User;
}
export class CreateUserUseCase extends BaseUseCase<
  CreateUserInput,
  CreateUserOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute(params: CreateUserInput): Promise<CreateUserOutput> {
    const userProps = params;

    const userWithSameEmail = await this.userRepository.findByProperty({
      email: params.email,
    });

    if (userWithSameEmail) {
      throw new Error('User with same email already exists.');
    }

    const hashedPassword = await hash(userProps.password, 8);

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
    return { user };
  }
}
