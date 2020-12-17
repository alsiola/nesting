import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import * as winston from "winston";
import { baseLogger } from "./logger.base";

@Injectable({ scope: Scope.REQUEST })
export class LogService {
    private logger: winston.Logger;
    private ctx = {};

    constructor() {
        this.logger = baseLogger.child({});
    }

    addCtx(ctx: {}) {
        this.ctx = { ...this.ctx, ...ctx };
    }

    info(msg: string, ctx?: {}) {
        this.logger.info(msg, { ...this.ctx, ...ctx });
    }

    error(msg: string, ctx?: {}) {
        this.logger.error(msg, { ...this.ctx, ...ctx });
    }
}
