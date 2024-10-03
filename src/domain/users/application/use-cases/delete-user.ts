import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { Injectable } from '@nestjs/common';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { UserRepository } from '../repositories/user-repository';

export interface DeleteUserInput {
  id: UniqueID;
}
export interface DeleteUserOutput {
  success: boolean;
}
@Injectable()
export class DeleteUserUseCase extends BaseUseCase<
  DeleteUserInput,
  DeleteUserOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute(params: DeleteUserInput): Promise<DeleteUserOutput> {
    const { id } = params;
    const userFounded = await this.userRepository.findByProperty({
      id: id,
    });
    if (!userFounded.item) throw new Error('User not found.');

    const { success } = await this.userRepository.delete({ id: id.toString() });
    return { success };
  }
}
