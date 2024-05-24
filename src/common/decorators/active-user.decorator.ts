import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ActiveUser = createParamDecorator(
  // ExecutionContext me permite acceder al Request
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
