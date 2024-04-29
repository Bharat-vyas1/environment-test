import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
export declare class TranslateInterceptor implements NestInterceptor {
    private readonly i18n;
    constructor(i18n: I18nService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
