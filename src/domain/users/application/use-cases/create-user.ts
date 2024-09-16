import { BaseUseCase } from 'src/core/use-cases/base-use-case';
import { User, UserProps } from '../../enterprise/entities/user';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface CreateUserOutput {
  user: User;
}
export class CreateUserUseCase extends BaseUseCase<
  CreateUserInput,
  CreateUserOutput
> {
  public async execute(params: CreateUserInput): Promise<CreateUserOutput> {
    const userProps: UserProps = {
      name: params.name,
      email: params.email,
      password: params.password,
      avatar: params.avatar,
    };
    const user = new User(userProps);
    return { user };
  }
}
