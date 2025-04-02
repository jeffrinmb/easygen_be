import { HttpStatus } from '@nestjs/common';

export class ResponseWrapper<T> {
  status: HttpStatus;
  result: T;
}
