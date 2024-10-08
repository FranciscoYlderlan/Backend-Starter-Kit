import { Either, failure, success } from '@/core/types/either';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { UserRepository } from '../repositories/user-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export interface EditUserInput {
  id: UniqueID;
  name?: string;
  email?: string;
  avatar?: string;
  password?: string;
}

type EditUserOutput = Either<{ success: boolean }, ResourceNotFoundError>;

export class EditUserUseCase extends BaseUseCase<
  EditUserInput,
  EditUserOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute(params: EditUserInput): Promise<EditUserOutput> {
    const { id, email, name, password, avatar } = params;

    const user = await this.userRepository.findById({ id });

    if (!user.item) return failure(new ResourceNotFoundError());

    const status = await this.userRepository.update({
      id,
      data: { name, email, avatar, password },
    });

    return success(status);
  }
}
