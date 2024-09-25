import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';

import { User } from '../../enterprise/entities/user';
import { UniqueID } from '../../enterprise/entities/value-objects/unique-id';
import { EditUserUseCase } from './edit-user';

let inMemoryUserRepository: InMemoryUserRepository;
let editUserUseCase: EditUserUseCase;

describe('Edit User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    editUserUseCase = new EditUserUseCase(inMemoryUserRepository);
  });
  it('should be able to edit a user', async () => {
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

    await editUserUseCase.execute({
      id,
      name: 'Name test1',
      email: 'email@test1',
      password: 'password-test1',
      avatar: 'test1.png',
    });

    const userUpdated: User = inMemoryUserRepository.Users[0];

    expect(userUpdated.getName()).toEqual('Name test1');
    expect(userUpdated.getEmail()).toEqual('email@test1');
    expect(userUpdated.getAvatar()).toEqual('test1.png');
    expect(userUpdated.getPassword()).toEqual('password-test1');
    expect(userUpdated.getUpdatedAt()).not.undefined;
  });
});
