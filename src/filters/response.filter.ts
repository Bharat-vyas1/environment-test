import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Catch(HttpException)
export class ErrorMessageSerializerFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const i18n = I18nContext.current();
    const response = ctx.getResponse();
    const errorResponse = exception.getResponse() as any;
    let errorMessages = [];
    let errorMessage = 'something_went_wrong_please_try_again';
    let errorField = null;

    if (
      errorResponse.message &&
      Array.isArray(errorResponse.message) &&
      errorResponse.message.length > 0
    ) {
      errorMessages = errorMessages.concat(errorResponse.message);
      const splittedMessage = errorResponse.message[0].split(' ');
      errorField = splittedMessage.shift();
      errorMessage = splittedMessage.join(' ');
    } else if (errorResponse.type === 'customException') {
      errorMessage = errorResponse.error;
      errorField = errorResponse.errorKey;
    } else if (typeof errorResponse === 'string') {
      errorMessage = errorResponse;
    } else if (errorResponse?.message) {
      errorMessage = errorResponse.message;
    }

    const translatedErrorMessage = await i18n.t(`translations.${errorMessage}`);

    if (!translatedErrorMessage.startsWith('translations.')) {
      errorMessage = translatedErrorMessage;
    }

    const serializedError = {
      statusCode: exception.getStatus(),
      message: errorMessage,
      errorField: errorField,
      messages: errorMessages,
      timestamp: new Date().toISOString(),
    };

    serializedError.message += '!';

    response.status(exception.getStatus()).json(serializedError);
  }
}
