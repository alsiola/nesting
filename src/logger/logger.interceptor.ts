import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Scope,
    Get,
    NotFoundException
} from "@nestjs/common";
import { PATH_METADATA } from "@nestjs/common/constants";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { LogService } from "./logger.service";
import { catchError, map } from "rxjs/operators";
import * as exceptions from "@nestjs/common/exceptions";

@Injectable({ scope: Scope.REQUEST })
export class LogInterceptor implements NestInterceptor {
    constructor(
        private readonly log: LogService,
        private reflector: Reflector
    ) {}

    private isNestError(err: any) {
        return Object.values(exceptions).every(
            (exception) => !(err instanceof exception)
        );
    }

    intercept(context: ExecutionContext, next: CallHandler) {
        const controllerPath = this.reflector.get(
            PATH_METADATA,
            context.getClass()
        );
        const methodPath = this.reflector.get(
            PATH_METADATA,
            context.getHandler()
        );
        const path = `/${controllerPath}/${methodPath}`;

        const controller = context.getClass().name;
        const handler = context.getHandler().name;

        const {
            path: pathInstance,
            method
        } = context.switchToHttp().getRequest<Request>();

        this.log.addCtx({ controller, handler, path, pathInstance, method });
        return next.handle();
    }
}
