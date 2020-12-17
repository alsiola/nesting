import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import * as winston from "winston";

const baseLogger = winston.createLogger({
    transports: [new winston.transports.Console()]
});

@Injectable({ scope: Scope.REQUEST })
export class LogService {
    private logger: winston.Logger;
    private ctx = {};

    constructor(@Inject(REQUEST) request: Request) {
        this.logger = baseLogger.child({
            path: request.path,
            method: request.method,
            correlationId: "abc123"
        });
    }

    addCtx(ctx: {}) {
        this.ctx = { ...this.ctx, ...ctx };
    }

    info(msg: string, ctx?: {}) {
        this.logger.info(msg, { ...this.ctx, ...ctx });
    }
}
