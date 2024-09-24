import { ShowResponse } from '@/core/repositories/base-repository';
import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { User } from '../../enterprise/entities/user';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UserRepository } from '../repositories/user-repository';

export interface FindUserInput {
  slug: Slug;
}

export interface FindUserOutput {
  item: Partial<User>;
}
export class FindUserUseCase extends BaseUseCase<
  FindUserInput,
  FindUserOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute(params: FindUserInput): Promise<FindUserOutput> {
    const { slug } = params;
    const user = await this.userRepository.findBySlug(slug.toString());
    if (!user.item) throw new Error('User not found.');

    return user;
  }
}
