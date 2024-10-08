import { BaseUseCase } from '@/core/use-cases/base-use-case';
import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/entities/user';
import { UserRepository } from '../repositories/user-repository';
import { Either, success } from '@/core/types/either';

export interface ListUsersInput {
  page: number;
  itemsPerPage?: number;
  sortDirection?: 'asc' | 'desc';
}

type ListUsersOutput = Either<
  {
    items: Partial<User>[];
    totalCount: number;
  },
  undefined
>;

@Injectable()
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

    return success({ items, totalCount });
  }
}
