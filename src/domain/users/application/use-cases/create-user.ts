import { BaseUseCase } from 'src/core/use-cases/base-use-case';
import { User, UserProps } from '../../enterprise/entities/user';

export interface CreateUserInput extends UserProps {}

export interface CreateUserOutput {
  user: User;
}
export class CreateUserUseCase extends BaseUseCase<
  CreateUserInput,
  CreateUserOutput
> {
  public async execute(params: CreateUserInput): Promise<CreateUserOutput> {
    const userProps = params;

    const user = new User(userProps);

    return { user };
  }
}
