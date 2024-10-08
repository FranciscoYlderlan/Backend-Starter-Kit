import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
  IndexRequest,
  IndexResponse,
  ShowRequest,
  ShowResponse,
  UpdateRequest,
  UpdateResponse,
} from '@/core/repositories/base-repository';
import { UserRepository } from '@/domain/users/application/repositories/user-repository';
import { User, UserProps } from '@/domain/users/enterprise/entities/user';
import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  public async show(params: ShowRequest): Promise<ShowResponse<User>> {
    throw new Error('Method not implemented.');
  }
  public async index({
    page,
    itemsPerPage,
    sortDirection,
  }: IndexRequest): Promise<IndexResponse<User>> {
    const skip = (page - 1) * itemsPerPage;
    const [users, totalCount] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        orderBy: { createdAt: sortDirection },
        skip,
        take: itemsPerPage,
      }),
      this.prisma.user.count(),
    ]);
    const items = users.map((user) => PrismaUserMapper.toDomain(user));
    return {
      items,
      totalCount,
    };
  }

  public async findBySlug(params: string): Promise<ShowResponse<User>> {
    return { item: {} };
  }

  public async findById(params: {
    id: UniqueID;
  }): Promise<ShowResponse<User>> {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        id: params.id.toString(),
      },
    });
    if (!foundUser) return { item: undefined };

    return { item: PrismaUserMapper.toDomain(foundUser) };
  }
  public async findByEmail(params: {
    email: string;
  }): Promise<ShowResponse<User>> {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        email: params.email,
      },
    });
    if (!foundUser) return { item: undefined };

    return { item: PrismaUserMapper.toDomain(foundUser) };
  }

  public async create(
    params: CreateRequest<Partial<UserProps>>,
  ): Promise<CreateResponse> {
    const data = PrismaUserMapper.toPersistence(params.data);
    const { id } = await this.prisma.user.create({
      data,
    });
    return { id: UniqueID.transform({ id }) };
  }

  public async update(
    params: UpdateRequest<Partial<UserProps>>,
  ): Promise<UpdateResponse> {
    const { id, ...data } = PrismaUserMapper.toPersistence(params.data);
    await this.prisma.user.update({
      where: { id },
      data,
    });
    return { success: true };
  }

  public async delete(params: DeleteRequest): Promise<DeleteResponse> {
    await this.prisma.user.delete({
      where: { id: params.id },
    });
    return { success: true };
  }
}
