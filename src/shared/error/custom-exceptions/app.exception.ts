import { HttpException } from '@nestjs/common';

export class AppException extends HttpException {
  private readonly error: string;
}
