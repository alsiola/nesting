import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { TeapotException } from "./teapot";

@Catch(TeapotException)
export class TeapotExceptionFilter implements ExceptionFilter<TeapotException> {
    catch(exception: TeapotException, host: ArgumentsHost) {
        console.log("I AM A TEAPOT !!!1!");

        host.switchToHttp()
            .getResponse<Response>()
            .status(exception.getStatus())
            .send("I AM A TEAPOT");
    }
}
