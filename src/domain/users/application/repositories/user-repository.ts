import {
  BaseRepository,
  CreateRequest,
  CreateResponse,
  ShowResponse,
} from '@/core/repositories/base-repository';
import { User } from '@/domain/users/enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';

export abstract class UserRepository extends BaseRepository<User> {
  public async findByProperty(
    params: Partial<User>,
  ): Promise<ShowResponse<User>> {
    return { item: {} };
  }
  public async create(
    params: CreateRequest<Partial<User>>,
  ): Promise<CreateResponse> {
    return { id: UniqueID.transform({}) };
  }
}
