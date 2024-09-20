import {
  BaseRepository,
  CreateRequest,
  CreateResponse,
} from '@/core/repositories/base-repository';
import { User } from '@/domain/users/enterprise/entities/user';

export abstract class UserRepository extends BaseRepository<User> {
  public async create(
    params: CreateRequest<Partial<User>>,
  ): Promise<CreateResponse> {
    return { id: '' };
  }
}
