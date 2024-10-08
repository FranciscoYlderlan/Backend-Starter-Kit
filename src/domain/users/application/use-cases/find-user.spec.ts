import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';

import { User } from '../../enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { FindUserUseCase } from './find-user';

let inMemoryUserRepository: InMemoryUserRepository;
let findUserUseCase: FindUserUseCase;

describe('Find User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    findUserUseCase = new FindUserUseCase(inMemoryUserRepository);
  });
  it('should be able to find a user', async () => {
    const id = UniqueID.transform({ value: 'id-test' });
    const userData = makeUser({
      id,
      name: 'Name example1',
      email: 'email@example1',
      password: 'password-example1',
    });

    inMemoryUserRepository.create({
      data: userData,
    });

    await findUserUseCase.execute({
      id,
    });

    const userUpdated: User = inMemoryUserRepository.Users[0];

    expect(userUpdated.getName()).toEqual('Name example1');
    expect(userUpdated.getEmail()).toEqual('email@example1');
    expect(userUpdated.getPassword()).toEqual('password-example1');
  });
});
