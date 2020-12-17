import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";

@Module({
    imports: [CatsModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
