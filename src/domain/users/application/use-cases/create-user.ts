import { Optional } from '@/core/types/optional';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { User, UserProps } from '../../enterprise/entities/user';
import { UserRepository } from '../repositories/user-repository';

export interface CreateUserInput
  extends Optional<UserProps, 'createdAt' | 'slug'> {}

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
