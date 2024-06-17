import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { error } from "console";

export class ValidationException extends BadRequestException{
    constructor(public validationErreur:any){
        super()
    }
}
@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter{
    catch(exception: ValidationException, host: ArgumentsHost):any {
        const ctx=host.switchToHttp();
        const response=ctx.getResponse();
        return response.status(400).json({
            statusCode:400,
            success:false,
            message:'',
            error:exception.validationErreur,
        })
    }
    
}