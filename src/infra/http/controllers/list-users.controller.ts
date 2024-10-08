import { Controller, Get, Query, UsePipes } from '@nestjs/common';

import { ListUsersUseCase } from '@/domain/users/application/use-cases/list-users';
import { User } from '@/domain/users/enterprise/entities/user';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { UserPresenter } from '../presenters/user-presenter';

const listQuerySchema = z.object({
  page: z.coerce.number(),
  //z.string().optional().default('1').transform(Number).pipe(z.number().min(1))
  itemsPerPage: z.coerce.number(),
  sortDirection: z.enum(['asc', 'desc']),
});

type ListQuerySchema = z.infer<typeof listQuerySchema>;

@Controller('/list')
export class ListUsersController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(listQuerySchema))
  async handle(@Query() query: ListQuerySchema) {
    const { page, itemsPerPage, sortDirection } = query;

    const result = await this.listUsersUseCase.execute({
      page,
      itemsPerPage,
      sortDirection,
    });
    if (result.isSuccess()) {
      const { items, totalCount } = result.value;
      return {
        items: items.map((item) => UserPresenter.toHttp(item as User)),
        totalCount,
      };
    }
  }
}
