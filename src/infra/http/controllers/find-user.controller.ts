import { FindUserUseCase } from '@/domain/users/application/use-cases/find-user';
import { User } from '@/domain/users/enterprise/entities/user';
import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';
import { Controller, Get, Param, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { UserPresenter } from '../presenters/user-presenter';

const findUserParamsSchema = z.object({
  id: z.string().uuid(),
});

type FindUserParamsSchema = z.infer<typeof findUserParamsSchema>;

@Controller('/get/:id')
export class FindUserController {
  constructor(private readonly findUserUseCase: FindUserUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(findUserParamsSchema))
  async handle(@Param() param: FindUserParamsSchema) {
    const { id: _id } = param;
    const id = UniqueID.transform({ value: _id });

    const result = await this.findUserUseCase.execute({
      id,
    });

    if (result.isSuccess()) {
      return { item: UserPresenter.toHttp(result.value.item as User) };
    }
  }
}
