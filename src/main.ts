import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TeapotExceptionFilter } from "./exceptions/teapot.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new TeapotExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
