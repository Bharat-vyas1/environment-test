import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class ErrorMessageSerializerFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Promise<void>;
}
