import { Either, failure, success } from '@/core/types/either';
import { Optional } from '@/core/types/optional';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { Injectable } from '@nestjs/common';
import { User, UserProps } from '../../enterprise/entities/user';
import { Encryptor } from '../cryptography/encryptor';
import { HashComparer } from '../cryptography/hash-comparer';
import { UserRepository } from '../repositories/user-repository';
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

export interface AuthenticateUserInput
  extends Optional<UserProps, 'createdAt' | 'slug' | 'id' | 'name'> {}

type AuthenticateUserOutput = Either<
  { access_token: string },
  ResourceAlreadyExistsError
>;

@Injectable()
export class AuthenticateUserUseCase extends BaseUseCase<
  AuthenticateUserInput,
  AuthenticateUserOutput
> {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encryptor: Encryptor,
  ) {
    super();
  }

  public async execute(
    body: AuthenticateUserInput,
  ): Promise<AuthenticateUserOutput> {
    const { email, password } = body;

    const user = await this.userRepository.findByEmail({ email });

    if (!user.item) {
      return failure(new WrongCredentialsError());
    }
    const result = user.item as User;

    const isPasswordValid = await this.hashComparer.compare(
      password,
      result.getPassword(),
    );

    if (!isPasswordValid) {
      return failure(new WrongCredentialsError());
    }

    const accessToken = await this.encryptor.encrypt({
      sub: result.getId().toString(),
    });

    return success({ access_token: accessToken });
  }
}
