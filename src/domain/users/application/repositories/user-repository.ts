import {
  BaseRepository,
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
  ShowResponse,
} from '@/core/repositories/base-repository';
import { User, UserProps } from '@/domain/users/enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';

export abstract class UserRepository extends BaseRepository<User, UserProps> {
  public async findByProperty<K extends keyof UserProps>(
    params: Record<K, UserProps[K]>,
  ): Promise<ShowResponse<User>> {
    return { item: {} };
  }
  public async create(
    params: CreateRequest<Partial<UserProps>>,
  ): Promise<CreateResponse> {
    return { id: UniqueID.transform({}) };
  }

  public async delete(params: DeleteRequest): Promise<DeleteResponse> {
    return { success: true };
  }
}
