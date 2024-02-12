import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ICurrentUser } from "../interfaces";

export const CurrentUser = createParamDecorator((data:unknown , ctx:ExecutionContext):ICurrentUser=>{
    const req = ctx.switchToHttp().getRequest()
    return req.user
})