import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { WinstonConfig } from './winston.config';

@Module({
  providers: [LoggerService, WinstonConfig],
  exports: [LoggerService],
})
export class LoggerModule {}
