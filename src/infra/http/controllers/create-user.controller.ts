import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user';
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';

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
    await this.createUserUseCase.execute({
      name,
      email,
      password,
    });
    return { name, email, password };
  }
}
