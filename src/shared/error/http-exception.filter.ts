/* eslint-disable */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { Response } from 'express';
import { ErrorType, ValidationErrorType } from './types';
import { ValidationError } from 'class-validator';
import { AppException } from './custom-exceptions/app.exception';

interface ValidationErrorResponse {
  message: ValidationError[];
}

function isValidationErrorResponse(
  response: any
): response is ValidationErrorResponse {
  return (
    response &&
    Array.isArray(response.message) &&
    response.message.every(
      (item: ValidationError) => item.property && item.constraints
    )
  );
}
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseValue =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message || '';

    let errorResponse: ErrorType;
    if (exception instanceof Error && !(exception instanceof HttpException)) {
      errorResponse = {
        status: status,
        timestamp: new Date().toISOString(),
        message: exception.message,
        error: exception.name,
      };
    } else if (
      status === HttpStatus.BAD_REQUEST &&
      this.isValidationException(exception)
    ) {
      const validationErrors = exception.response.message as ValidationError[];
      const customErrors = this.formatValidationErrors(validationErrors);
      errorResponse = {
        status: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        message: 'VALIDATION_FAILED',
        error: responseValue?.error ?? '',
        errors: customErrors,
      };
    } else {
      errorResponse = {
        status: status,
        timestamp: new Date().toISOString(),
        error: responseValue?.error ?? '',
        message: responseValue?.message ?? '',
        data:
          exception instanceof AppException ? exception.getData() : undefined,
      };
    }
    this.logger.error(
      `HTTP Exception: ${errorResponse.error} - ${errorResponse.message}`,
      exception.stack,
      'HttpExceptionFilter'
    );
    response.status(status).json(errorResponse);
  }

  private isValidationException(exception: any): boolean {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (isValidationErrorResponse(response)) {
        return true;
      }
    }
    return false;
  }

  private formatValidationErrors(
    validationErrors: ValidationError[]
  ): ValidationErrorType[] {
    return validationErrors.map((error) => {
      return {
        property: error.property,
        constraints: error.constraints,
      };
    });
  }
}
