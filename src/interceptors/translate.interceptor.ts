import {
  HttpStatus,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from 'nestjs-i18n';
import { CustomException } from '../utilities/custom-exception.utility';

@Injectable()
export class TranslateInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const whitelistUrls = ['/', '/health', '/health/'];
    const lang = request.headers['accept-language'];

    if (whitelistUrls.includes(request.url)) {
      return next.handle();
    }

    if (!lang) {
      throw new CustomException(
        'accept_language_header_is_required',
        'accept_language',
        HttpStatus.BAD_REQUEST,
      );
    }

    return next.handle().pipe(
      map((data) => {
        this.i18n.resolveLanguage(lang);
        return data;
      }),
    );
  }
}
