/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
import { Injectable } from '@nestjs/common';
import {
  createLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';
import 'winston-daily-rotate-file';
import { TransportItems } from './types';

@Injectable()
export class WinstonConfig {
  private customFormat = format.printf(
    ({ timestamp, level, message, context, trace, stack }) => {
      return `${timestamp} - [${level}] - ${context || ''} ${message}: ${stack || ''} ${trace ? `\n${trace}` : ''}`;
    }
  );

  private get transportItems(): TransportItems {
    return {
      console: new transports.Console({
        format: format.combine(
          format((log) => {
            log.level = log.level.toUpperCase().padEnd(7);
            return log;
          })(),
          format.timestamp(),
          format.colorize(),
          format.errors({ stack: true }),
          this.customFormat
        ),
        level: 'silly',
      }),
      allLogs: new transports.DailyRotateFile({
        filename: 'logs/all-logs-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: format.combine(
          format.timestamp(),
          format.errors({ stack: true }),
          format.json()
        ),
        level: 'info',
      }),
      errorLogs: new transports.DailyRotateFile({
        filename: 'logs/error-logs-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: format.combine(
          format.timestamp(),
          format.errors({ stack: true }),
          format.json()
        ),
        level: 'error',
      }),
    };
  }

  private get loggerOption(): LoggerOptions {
    return {
      level: 'info',
      format: format.json(),
      transports: [
        this.transportItems.console,
        this.transportItems.allLogs,
        this.transportItems.errorLogs,
      ],
    };
  }

  createLoggerInstance(): Logger {
    const instanceLogger: LoggerOptions = this.loggerOption;
    return createLogger(instanceLogger);
  }
}
