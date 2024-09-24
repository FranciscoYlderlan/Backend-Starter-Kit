import {
  BaseRepository,
  CreateRequest,
  CreateResponse,
  ShowResponse,
} from '@/core/repositories/base-repository';
import { User, UserProps } from '@/domain/users/enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';

export abstract class UserRepository extends BaseRepository<User, UserProps> {
  public async findByProperty(
    params: Partial<UserProps>,
  ): Promise<ShowResponse<User>> {
    return { item: {} };
  }
  public async create(
    params: CreateRequest<Partial<UserProps>>,
  ): Promise<CreateResponse> {
    return { id: UniqueID.transform({}) };
  }
}
