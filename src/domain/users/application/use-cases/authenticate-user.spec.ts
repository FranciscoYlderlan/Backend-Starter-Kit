import { FakeEncryptor } from 'test/cryptography/fake-encrypter';
import { FakeHash } from 'test/cryptography/fake-hash';
import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { expect } from 'vitest';
import { UserProps } from '../../enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { AuthenticateUserUseCase } from './authenticate-user';

let inMemoryUserRepository: InMemoryUserRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let fakeHash: FakeHash;
let fakeEncryptor: FakeEncryptor;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    fakeHash = new FakeHash();
    fakeEncryptor = new FakeEncryptor();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeHash,
      fakeEncryptor,
    );
  });
  it('should be able to authenticate a user', async () => {
    const id = UniqueID.transform({ value: 'test-id' });
    const userData = makeUser({
      id,
      email: 'user@email.test',
      password: await fakeHash.hash('test123'),
    });

    inMemoryUserRepository.create({
      data: userData,
    });

    expect(inMemoryUserRepository.Users).toHaveLength(1);

    const credentials = {
      email: 'user@email.test',
      password: 'test123',
    };

    const result = await authenticateUserUseCase.execute(credentials);

    expect(result.isSuccess()).toEqual(true);

    if (result.isSuccess()) {
      const { value } = result;

      expect(value).not.toBeNull();
      expect(value).toEqual({ access_token: expect.any(String) });
    }
  });
});
