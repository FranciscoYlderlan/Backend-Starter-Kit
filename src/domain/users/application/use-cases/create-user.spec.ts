import { expect, test } from 'vitest';
import { CreateUserUseCase } from './create-user';

test('Create an user', async () => {
  const createUser = new CreateUserUseCase();

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
