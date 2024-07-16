
import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Services } from 'src/config';
import { AuthPattern } from '../pattern';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(Services.Nats) private readonly client: ClientProxy,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.getToken(request);

        if (!token) throw new UnauthorizedException('Token not provided');

        try {
            const payload = await firstValueFrom(this.client.send(AuthPattern.verify, token));
            request['user'] = payload.id;
            request['token'] = token;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
        return true;
    }

    private getToken(request: Request): string | undefined {
        const [type, token] = request.headers["authorization"]?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}