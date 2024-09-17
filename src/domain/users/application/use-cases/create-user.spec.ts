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
} from 'src/core/repositories/base-repository';
import { expect, test } from 'vitest';
import { User } from '../../enterprise/entities/user';
import { UserRepository } from '../repositories/user-repository';
import { CreateUserUseCase } from './create-user';

const fakeUsersRepository: UserRepository = {
  create: async (
    params: CreateRequest<Partial<User>>,
  ): Promise<CreateResponse> => {
    return { id: '' };
  },
  index: (params: IndexRequest): Promise<IndexResponse<User>> => {
    throw new Error('Function not implemented.');
  },
  show: (params: ShowRequest): Promise<ShowResponse<User>> => {
    throw new Error('Function not implemented.');
  },
  update: (params: UpdateRequest<Partial<User>>): Promise<UpdateResponse> => {
    throw new Error('Function not implemented.');
  },
  delete: (params: DeleteRequest): Promise<DeleteResponse> => {
    throw new Error('Function not implemented.');
  },
};

test('Create an user', async () => {
  const createUser = new CreateUserUseCase(fakeUsersRepository);

  const { user: newUser } = await createUser.execute({
    name: 'User Test',
    email: 'user@email.test',
    avatar: 'user.png',
    password: 'test123',
  });

  expect(newUser.getId()).not.toBeUndefined();
  expect(newUser.getId()).not.toBeNull();
  expect(newUser.getName()).toEqual('User Test');
  expect(newUser.getEmail()).toEqual('user@email.test');
  expect(newUser.getAvatar()).toEqual('user.png');
  expect(newUser.getPassword()).toEqual('test123');
});
