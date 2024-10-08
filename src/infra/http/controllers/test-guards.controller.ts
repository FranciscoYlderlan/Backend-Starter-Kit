import { PayloadUserSchema } from '@/infra/auth/jwt.strategy';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserToken } from './token-decorator';
@Controller('/test')

@UseGuards(AuthGuard('jwt'))
export class TestController {
  @Get()
  async handle(@UserToken() user: PayloadUserSchema) {
    return { return: user };
  }
}
