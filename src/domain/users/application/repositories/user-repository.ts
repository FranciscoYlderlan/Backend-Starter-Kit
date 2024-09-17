import {
  BaseRepository,
  CreateRequest,
  CreateResponse,
  IndexRequest,
  IndexResponse,
} from 'src/core/repositories/base-repository';
import { User } from '../../enterprise/entities/user';

export abstract class UserRepository extends BaseRepository<User> {
  public async create(
    params: CreateRequest<Partial<User>>,
  ): Promise<CreateResponse> {
    return { id: '' };
  }
}
