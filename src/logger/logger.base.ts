import { LoggerService } from "@nestjs/common";
import * as winston from "winston";
import { buildFileTransports } from "@get-impala/hapi-logger";

export const baseLogger = winston.createLogger({
    transports: buildFileTransports({
        serviceName: "catscatscats",
        nodeEnvironment: "development",
        deploymentEnvironment: "development"
    })
});

export const nestLogger: LoggerService = {
    log: (msg: string, ctx: any) => baseLogger.log("info", msg, ctx),
    error: baseLogger.error.bind(baseLogger),
    warn: baseLogger.warn.bind(baseLogger),
    debug: baseLogger.debug.bind(baseLogger),
    verbose: baseLogger.verbose.bind(baseLogger)
};
