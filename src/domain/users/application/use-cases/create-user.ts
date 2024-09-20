import { Optional } from 'src/core/types/optional';
import { BaseUseCase } from 'src/core/use-cases/base-use-case';
import { User, UserProps } from '../../enterprise/entities/user';
import { UserRepository } from '../repositories/user-repository';

export interface CreateUserInput extends Optional<UserProps, 'createdAt'> {}

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

    const user = User.create(userProps);
    await this.userRepository.create({ data: user });
    return { user };
  }
}
