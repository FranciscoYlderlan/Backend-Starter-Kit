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
import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';

export class InMemoryUserRepository implements UserRepository {
  public Users: User[];

  public async findByProperty(
    params: Partial<UserProps>,
  ): Promise<ShowResponse<User>> {
    const [key, value] = Object.entries(params)[0];
    const foundUser = this.Users.find(
      (user) => user[key as keyof UserProps] === value,
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
    // const {
    //   getId,
    //   getName,
    //   getSlug,
    //   getEmail,
    //   getPassword,
    //   getAvatar,
    //   getCreatedAt,
    //   getUpdatedAt,
    // } = params.data;
    // const newUser = User.create(
    //   {
    //     name: getName(),
    //     email: getEmail(),
    //     password: getPassword(),
    //     avatar: getAvatar(),
    //     slug: Slug.transform({ value: getSlug() }),
    //     createdAt: getCreatedAt(),
    //     updatedAt: getUpdatedAt(),
    //   },
    //   getId(),
    // );

    // this.Users.push(newUser);

    // return { id: this.Users[0].getId() };
    return { id: {} as UniqueID };
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
