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

export abstract class UserRepository extends BaseRepository<User, UserProps> {
  abstract index(params: IndexRequest): Promise<IndexResponse<User>>;

  abstract findBySlug(params: string): Promise<ShowResponse<User>>;

  abstract findByProperty<K extends keyof UserProps>(
    params: Record<K, UserProps[K]>,
  ): Promise<ShowResponse<User>>;

  abstract create(
    params: CreateRequest<Partial<UserProps>>,
  ): Promise<CreateResponse>;

  abstract update(
    params: UpdateRequest<Partial<UserProps>>,
  ): Promise<UpdateResponse>;

  abstract delete(params: DeleteRequest): Promise<DeleteResponse>;
}
