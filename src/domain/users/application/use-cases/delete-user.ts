import { Either, failure, success } from '@/core/types/either';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { Injectable } from '@nestjs/common';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { UserRepository } from '../repositories/user-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
export interface DeleteUserInput {
  id: UniqueID;
}

type DeleteUserOutput = Either<{ success: boolean }, ResourceNotFoundError>;

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
    const userFounded = await this.userRepository.findById({
      id: id,
    });
    if (!userFounded.item) return failure(new ResourceNotFoundError());

    const { success: success_ } = await this.userRepository.delete({
      id: id.toString(),
    });

    return success({ success: success_ });
  }
}
