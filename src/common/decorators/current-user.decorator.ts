import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// How to use: @CurrentUser() user: User
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
