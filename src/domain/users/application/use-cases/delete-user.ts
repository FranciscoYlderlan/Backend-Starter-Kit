import { Optional } from '@/core/types/optional';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { User, UserProps } from '../../enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { UserRepository } from '../repositories/user-repository';

export interface DeleteUserInput {
  id: UniqueID;
}
export interface DeleteUserOutput {
  success: boolean;
}
export class DeleteUserUseCase extends BaseUseCase<
  DeleteUserInput,
  DeleteUserOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute(params: DeleteUserInput): Promise<DeleteUserOutput> {
    const { id } = params;
    const userFounded = this.userRepository.findByProperty({ id });
    if (!userFounded) throw new Error('User not found.');

    const { success } = await this.userRepository.delete({ id: id.toString() });
    return { success };
  }
}
