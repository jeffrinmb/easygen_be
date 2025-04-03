import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorDataType } from '../types';

export class AppException extends HttpException {
  private readonly error: string;
  private readonly data: ErrorDataType | undefined;

  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    error: string = 'App Exception',
    data?: ErrorDataType
  ) {
    super({ error, message, data }, status);
    this.error = error;
    this.data = data;
  }

  getError(): string {
    return this.error;
  }

  getData(): ErrorDataType | undefined {
    return this.data;
  }
}
