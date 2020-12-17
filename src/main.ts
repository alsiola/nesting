import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { nestLogger } from "./logger/logger.base";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: nestLogger
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
