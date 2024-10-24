import { Either, failure, success } from '@/core/types/either';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { User } from '../../enterprise/entities/user';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UserRepository } from '../repositories/user-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export interface FindUserInput {
  slug: Slug;
}

type FindUserOutput = Either<{ item: Partial<User> }, ResourceNotFoundError>;

export class FindUserBySlugUseCase extends BaseUseCase<
  FindUserInput,
  FindUserOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute(params: FindUserInput): Promise<FindUserOutput> {
    const { slug } = params;
    const { item } = await this.userRepository.findBySlug(slug.toString());

    if (!item) return failure(new ResourceNotFoundError());

    return success({ item });
  }
}
