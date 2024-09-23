import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { CreateUserUseCase } from './create-user';

let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });
  it('should be able to create a user', async () => {
    const { user: newUser } = await createUserUseCase.execute({
      name: 'User Test',
      email: 'user@email.test',
      avatar: 'user.png',
      password: 'test123',
    });
    expect(newUser.getId()).not.toBeUndefined();
    expect(newUser.getId()).not.toBeNull();
    expect(newUser.getName()).toEqual('User Test');
    expect(newUser.getSlug()).toEqual('user-test');
    expect(newUser.getEmail()).toEqual('user@email.test');
    expect(newUser.getAvatar()).toEqual('user.png');
    expect(newUser.getPassword()).toEqual('test123');
  });
});
