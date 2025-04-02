import { Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WinstonConfig } from './winston.config';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor(private readonly winstonConfig: WinstonConfig) {
    this.logger = this.winstonConfig.createLoggerInstance();
  }

  log(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, { context, trace });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, { context });
  }
}
