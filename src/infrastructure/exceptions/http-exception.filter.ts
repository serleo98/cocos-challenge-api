import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { MarketDataNotFoundException } from '../../domain/exceptions/market-data-not-found.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // Default error response structure
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Handle domain-specific exceptions
    if (exception instanceof UserNotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof MarketDataNotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception.status) {
      // Handle NestJS HTTP exceptions
      status = exception.status;
      message = exception.message;
    }

    // Log the exception (in production, use a proper logging service)
    console.error(`Exception: ${exception.message}`, exception.stack);
    
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
