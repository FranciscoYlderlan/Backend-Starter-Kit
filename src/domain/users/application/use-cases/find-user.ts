import { Either, failure, success } from '@/core/types/either';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { User } from '../../enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { UserRepository } from '../repositories/user-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export interface FindUserInput {
  id: UniqueID;
}

type FindUserOutput = Either<{ item: Partial<User> }, ResourceNotFoundError>;

export class FindUserUseCase extends BaseUseCase<
  FindUserInput,
  FindUserOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute(params: FindUserInput): Promise<FindUserOutput> {
    const { id } = params;
    const { item } = await this.userRepository.findById({ id });

    if (!item) return failure(new ResourceNotFoundError());

    return success({ item });
  }
}
