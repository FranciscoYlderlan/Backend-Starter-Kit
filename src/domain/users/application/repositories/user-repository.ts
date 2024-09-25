import {
  BaseRepository,
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
  IndexRequest,
  IndexResponse,
  ShowResponse,
  UpdateRequest,
  UpdateResponse,
} from '@/core/repositories/base-repository';
import { User, UserProps } from '@/domain/users/enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';

export abstract class UserRepository extends BaseRepository<User, UserProps> {
  public async index(params: IndexRequest): Promise<IndexResponse<User>> {
    return { items: [], totalCount: -1 };
  }

  public async findBySlug(params: string): Promise<ShowResponse<User>> {
    return { item: {} };
  }

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

  public async update(
    params: UpdateRequest<Partial<UserProps>>,
  ): Promise<UpdateResponse> {
    return { success: true };
  }

  public async delete(params: DeleteRequest): Promise<DeleteResponse> {
    return { success: true };
  }
}
