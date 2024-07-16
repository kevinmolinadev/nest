import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: "user" | "token", ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return data ? request[`${data}`] : {
            user: request.user,
            token: request.token
        };
    },
);