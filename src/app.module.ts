import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CatsModule } from "./cats/cats.module";
import { AllExceptionFilter } from "./exceptions/exception.filter";
import { LogInterceptor } from "./logger/logger.interceptor";
import { LogModule } from "./logger/logger.module";

@Module({
    imports: [CatsModule, LogModule],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LogInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter
        }
    ],
    exports: []
})
export class AppModule {}
