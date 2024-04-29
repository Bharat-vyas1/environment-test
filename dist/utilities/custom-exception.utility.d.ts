import { HttpException, HttpStatus } from '@nestjs/common';
export declare class CustomException extends HttpException {
    constructor(error: string, errorKey: any, statusCode: HttpStatus);
}
