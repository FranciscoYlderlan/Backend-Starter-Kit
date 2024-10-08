import { FakeHash } from 'test/cryptography/fake-hash';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { CreateUserUseCase } from './create-user';

let inMemoryUserRepository: InMemoryUserRepository;
let hash: FakeHash;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hash = new FakeHash();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository, hash);
  });
  it('should be able to create a user', async () => {
    const result = await createUserUseCase.execute({
      name: 'User Test',
      email: 'user@email.test',
      avatar: 'user.png',
      password: 'test123',
    });

    expect(result.isSuccess()).toEqual(true);
    if (result.isSuccess()) {
      const { user: newUser } = result.value;

      expect(newUser.getId()).not.toBeNull();
      expect(newUser.getName()).toEqual('User Test');
      expect(newUser.getSlug().toString()).toEqual('user-test');
      expect(newUser.getEmail()).toEqual('user@email.test');
      expect(newUser.getAvatar()).toEqual('user.png');
      expect(newUser.getPassword()).toEqual('test123-hashed');
    }
  });
});
