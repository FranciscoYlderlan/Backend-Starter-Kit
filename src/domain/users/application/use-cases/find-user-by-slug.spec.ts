import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { FindUserUseCase } from './find-user-by-slug';

let inMemoryUserRepository: InMemoryUserRepository;
let findUserUseCase: FindUserUseCase;

describe('Find User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    findUserUseCase = new FindUserUseCase(inMemoryUserRepository);
  });
  it('should be able to find a user', async () => {
    const userData = makeUser({
      name: 'Name example1',
      email: 'email@example1',
      password: 'password-example1',
    });

    const userData2 = makeUser({
      name: 'Name example2',
      email: 'email@example2',
      password: 'password-example2',
    });

    inMemoryUserRepository.create({
      data: userData,
    });

    inMemoryUserRepository.create({
      data: userData2,
    });

    const slug = Slug.transform({ value: 'name-example2' });

    const result = await findUserUseCase.execute({ slug });

    expect(result.item.getSlug().toString()).toEqual('name-example2');
  });
});
