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

  public async findByProperty<K extends keyof UserProps>(
    params: Record<K, UserProps[K]>,
  ): Promise<ShowResponse<User>> {
    const [key, value] = Object.entries(params)[0];

    const foundUser = await this.prisma.user.findFirst({
      where: {
        [key as keyof UserProps]: value,
      },
    });
    if (!foundUser) return { item: {} };
    return { item: PrismaUserMapper.toDomain(foundUser) };
  }

  public async create(
    params: CreateRequest<Partial<UserProps>>,
  ): Promise<CreateResponse> {
    return { id: UniqueID.transform({}) };
  }

  public async update(
    params: UpdateRequest<Partial<UserProps>>,
  ): Promise<UpdateResponse> {
    return { success: true };
  }

  public async delete(params: DeleteRequest): Promise<DeleteResponse> {
    return { success: true };
  }
}
