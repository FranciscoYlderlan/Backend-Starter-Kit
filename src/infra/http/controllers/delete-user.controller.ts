import { DeleteUserUseCase } from '@/domain/users/application/use-cases/delete-user';
import { ResourceNotFoundError } from '@/domain/users/application/use-cases/errors/resource-not-found-error';
import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';
import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';

const deleteUserParamsSchema = z.object({
  id: z.string().uuid(),
});

type DeleteUserParamsSchema = z.infer<typeof deleteUserParamsSchema>;

@Controller('/delete/:id')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete()
  @UsePipes(new ZodValidationPipe(deleteUserParamsSchema))
  async handle(@Param() param: DeleteUserParamsSchema) {
    const { id: _id } = param;
    const id = UniqueID.transform({ value: _id });

    const result = await this.deleteUserUseCase.execute({
      id,
    });

    if (result.isFailure()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    if (result.isSuccess()) {
      return { success: result.value.success };
    }
  }
}
