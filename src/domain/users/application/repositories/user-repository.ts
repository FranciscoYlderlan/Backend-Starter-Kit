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
  abstract index(params: IndexRequest): Promise<IndexResponse<User>>;

  abstract findBySlug(params: string): Promise<ShowResponse<User>>;

  abstract findById(params: { id: UniqueID }): Promise<ShowResponse<User>>;

  abstract findByEmail(params: { email: string }): Promise<ShowResponse<User>>;

  abstract create(
    params: CreateRequest<Partial<UserProps>>,
  ): Promise<CreateResponse>;

  abstract update(
    params: UpdateRequest<Partial<UserProps>>,
  ): Promise<UpdateResponse>;

  abstract delete(params: DeleteRequest): Promise<DeleteResponse>;
}
