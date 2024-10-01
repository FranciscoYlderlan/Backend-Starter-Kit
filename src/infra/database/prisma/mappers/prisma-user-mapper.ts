import { User } from '@/domain/users/enterprise/entities/user';
import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  public static toDomain(raw: PrismaUser): User {
    const { id, avatar, name, email, createdAt, password, updatedAt } = raw;

    return User.create({
      id: UniqueID.transform({ value: id }),
      email,
      name,
      password,
      avatar,
      createdAt,
      updatedAt,
    });
  }
}
