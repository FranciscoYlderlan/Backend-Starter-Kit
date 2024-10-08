import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user';
import { ResourceAlreadyExistsError } from '@/domain/users/application/use-cases/errors/resource-already-exists-error';
import { WrongCredentialsError } from '@/domain/users/application/use-cases/errors/wrong-credentials-error';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';

const createPostBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreatePostBodySchema = z.infer<typeof createPostBodySchema>;

@Controller('/post')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPostBodySchema))
  async handle(@Body() body: CreatePostBodySchema) {
    const { name, email, password } = body;
    const result = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
