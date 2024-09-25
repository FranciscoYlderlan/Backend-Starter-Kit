import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { User } from '../../enterprise/entities/user';
import { UserRepository } from '../repositories/user-repository';

export interface ListUsersInput {
  page: number;
  itemsPerPage?: number;
  sortDirection?: 'asc' | 'desc';
}

export interface ListUsersOutput {
  items: Partial<User>[];
  totalCount: number;
}
export class ListUsersUseCase extends BaseUseCase<
  ListUsersInput,
  ListUsersOutput
> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async execute({
    page,
    itemsPerPage = 10,
    sortDirection = 'desc',
  }: ListUsersInput): Promise<ListUsersOutput> {
    const { items, totalCount } = await this.userRepository.index({
      page,
      itemsPerPage,
      sortDirection,
    });

    return { items, totalCount };
  }
}
