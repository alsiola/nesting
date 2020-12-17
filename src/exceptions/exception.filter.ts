import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    InternalServerErrorException,
    Injectable,
    Scope
} from "@nestjs/common";
import { Response } from "express";
import { LogService } from "src/logger/logger.service";

@Catch()
@Injectable({ scope: Scope.REQUEST })
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly log: LogService) {}

    private respond(response: Response, exception: HttpException) {
        return response
            .status(exception.getStatus())
            .json(exception.getResponse());
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        if (exception instanceof HttpException) {
            return this.respond(response, exception);
        }

        this.log.error("Uncaught error in handler", { err: exception });
        return this.respond(response, new InternalServerErrorException());
    }
}
