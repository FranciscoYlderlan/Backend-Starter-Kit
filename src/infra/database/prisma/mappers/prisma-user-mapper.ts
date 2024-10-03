import { User, UserProps } from '@/domain/users/enterprise/entities/user';
import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';
import { Prisma, User as PrismaUser } from '@prisma/client';

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

  public static toPersistence(
    raw: Partial<UserProps>,
  ): Prisma.UserUncheckedCreateInput {
    const { id, avatar, name, email, createdAt, password, updatedAt } =
      raw as UserProps;

    return {
      id: id.toString(),
      avatar,
      name,
      password,
      email,
      createdAt,
      updatedAt,
    };
  }
}
