import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { ListUsersUseCase } from './list-users';

let inMemoryUserRepository: InMemoryUserRepository;
let listUsersUseCase: ListUsersUseCase;

describe('List Users', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    listUsersUseCase = new ListUsersUseCase(inMemoryUserRepository);
  });

  it('should be able to list users sorted', async () => {
    await inMemoryUserRepository.create({
      data: makeUser({
        name: 'Name example1',
        email: 'email1@example.com',
        password: 'password-example1',
        createdAt: new Date(2024, 1, 10),
      }),
    });
    await inMemoryUserRepository.create({
      data: makeUser({
        name: 'Name example2',
        email: 'email2@example.com',
        password: 'password-example2',
        createdAt: new Date(2024, 1, 5),
      }),
    });
    await inMemoryUserRepository.create({
      data: makeUser({
        name: 'Name example3',
        email: 'email3@example.com',
        password: 'password-example3',
        createdAt: new Date(2024, 1, 20),
      }),
    });

    const { items, totalCount } = await listUsersUseCase.execute({
      page: 1,
      itemsPerPage: 10,
    });

    expect(items).toHaveLength(3);
    expect(totalCount).toBe(3);

    expect(items[0].getCreatedAt()).toEqual(new Date(2024, 1, 20));
    expect(items[1].getCreatedAt()).toEqual(new Date(2024, 1, 10));
    expect(items[2].getCreatedAt()).toEqual(new Date(2024, 1, 5));
  });

  it('should be able to list paginated users', async () => {
    for (let i = 0; i < 12; i++) {
      await inMemoryUserRepository.create({
        data: makeUser(),
      });
    }

    // Executando o caso de uso de listagem
    const { items, totalCount } = await listUsersUseCase.execute({
      page: 3,
      itemsPerPage: 5,
    });

    expect(items).toHaveLength(2);
    expect(totalCount).toBe(12);
  });
});
