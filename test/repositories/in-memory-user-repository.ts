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

type RequiredUserProps = Required<
  Pick<UserProps, 'name' | 'email' | 'password'>
>;

export class InMemoryUserRepository implements UserRepository {
  public Users: User[] = [];

  public async index({
    page,
    itemsPerPage,
    sortDirection,
  }: IndexRequest): Promise<IndexResponse<User>> {
    const users = this.Users.sort((a, b) => {
      const dateA = a.getCreatedAt().getTime();
      const dateB = b.getCreatedAt().getTime();
      if (sortDirection === 'asc') {
        return dateA - dateB;
      }
      return dateB - dateA;
    });

    const totalCount = users.length;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage; // ou  page * itemsPerPage;

    const paginatedUsers = users.slice(startIndex, endIndex);

    return { items: paginatedUsers, totalCount };
  }
  public async findByProperty(
    params: Partial<UserProps>,
  ): Promise<ShowResponse<User>> {
    const [key, value] = Object.entries(params)[0];
    const foundUser = this.Users.find(
      (user) => user[key as keyof UserProps] === value,
    );
    if (!foundUser) return { item: undefined };
    return { item: foundUser };
  }

  public async findBySlug(slug: string): Promise<ShowResponse<User>> {
    const foundUser = await this.Users.find(
      (user) => user.getSlug().toString() === slug,
    );

    if (!foundUser) return { item: undefined };
    return { item: foundUser };
  }

  public async show(params: ShowRequest): Promise<ShowResponse<User>> {
    return { item: {} };
  }
  public async create(
    params: CreateRequest<Partial<UserProps>>,
  ): Promise<CreateResponse> {
    const { id, name, avatar, createdAt, email, password, slug, updatedAt } =
      params.data as RequiredUserProps & Partial<UserProps>;
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
    const {
      id,
      data: { name, email, password, avatar },
    } = params;

    const itemIndex = this.Users.findIndex(
      (item) => item.getId().toString() === id.toString(),
    );

    const auxUser: User = this.Users[itemIndex];

    auxUser.update({ name, email, avatar, password });

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
