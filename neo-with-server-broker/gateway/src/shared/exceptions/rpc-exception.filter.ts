import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse();
        const error: Record<string, any> | string = exception.getError();
        if (typeof error === "object" && "status" in error && "response" in error) return response.status(error.status).json(error.response)
        response.status(400).json(error)
    }
}