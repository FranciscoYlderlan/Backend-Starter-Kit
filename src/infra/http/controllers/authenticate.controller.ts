import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user';
import { WrongCredentialsError } from '@/domain/users/application/use-cases/errors/wrong-credentials-error';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('sessions')
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;
    const result = await this.authenticateUser.execute({
      email,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;
      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    if (result.isSuccess()) {
      return { access_token: result.value.access_token };
    }
  }
}
