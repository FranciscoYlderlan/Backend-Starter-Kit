import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
  IndexRequest,
  IndexResponse,
  ShowRequest,
  ShowResponse,
  UpdateRequest,
  UpdateResponse,
} from '@/core/repositories/base-repository';
import { UserRepository } from '@/domain/users/application/repositories/user-repository';
import { User, UserProps } from '@/domain/users/enterprise/entities/user';

export class InMemoryUserRepository implements UserRepository {
  public Users: User[] = [];

  public async findByProperty(
    params: Partial<UserProps>,
  ): Promise<ShowResponse<User>> {
    const [key, value] = Object.entries(params)[0];
    const foundUser = this.Users.find(
      (user) => user[key as keyof UserProps] === value,
    );

    return { item: foundUser };
  }

  public async findBySlug(slug: string): Promise<ShowResponse<User>> {
    const foundUser = await this.Users.find(
      (user) => user.getSlug().toString() === slug,
    );
    return { item: foundUser };
  }

  public async index(params: IndexRequest): Promise<IndexResponse<User>> {
    return { items: [], total: -1 };
  }
  public async show(params: ShowRequest): Promise<ShowResponse<User>> {
    return { item: {} };
  }
  public async create(
    params: CreateRequest<Partial<UserProps>>,
  ): Promise<CreateResponse> {
    const { id, name, avatar, createdAt, email, password, slug, updatedAt } =
      params.data;
    const props = {
      id,
      name,
      email,
      password,
      avatar,
      slug,
      createdAt,
    };
    const auxUser: User = User.create(props);

    this.Users.push(auxUser);

    return { id: this.Users[0].getId() };
  }
  public async update(
    params: UpdateRequest<Partial<UserProps>>,
  ): Promise<UpdateResponse> {
    return { success: true };
  }
  public async delete(params: DeleteRequest): Promise<DeleteResponse> {
    params.id;
    const userIndex = this.Users.findIndex(
      (user) => user.getId().toString() === params.id,
    );

    this.Users.splice(userIndex, 1);
    return { success: true };
  }
}
