import { transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export type TransportItems = {
  console: transports.ConsoleTransportInstance;
  allLogs: DailyRotateFile;
  errorLogs: DailyRotateFile;
};
