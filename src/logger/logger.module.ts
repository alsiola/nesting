import { Module } from "@nestjs/common";
import { LogService } from "./logger.service";

@Module({
    imports: [],
    controllers: [],
    providers: [LogService],
    exports: [LogService]
})
export class LogModule {}
