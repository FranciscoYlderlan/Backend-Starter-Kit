import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { DeleteUserUseCase } from './delete-user';

let inMemoryUserRepository: InMemoryUserRepository;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    deleteUserUseCase = new DeleteUserUseCase(inMemoryUserRepository);
  });
  it('should be able to delete a user', async () => {
    const id = Slug.transform({ value: 'test-id' });
    const userData = makeUser({ id });

    inMemoryUserRepository.create({
      data: userData,
    });

    deleteUserUseCase.execute({ id });

    expect(inMemoryUserRepository.Users).toHaveLength(0);
  });
});
