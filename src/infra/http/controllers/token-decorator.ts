import { PayloadUserSchema } from '@/infra/auth/jwt.strategy';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserToken = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as PayloadUserSchema;
  },
);
