import { Injectable, LoggerService } from '@nestjs/common';
import { createWriteStream, WriteStream, mkdirSync } from 'fs';

import * as config from 'config';
import * as moment from 'moment';
import chalk, {Chalk} from 'chalk';
import { dirname } from 'path';
const logConfig = config.get('log');

@Injectable()
export class AppLoggerService implements LoggerService {
  errWriteStream: WriteStream;
  logWriteStream: WriteStream;

  debugTheme: Chalk;
  logTheme: Chalk;
  errorTheme: Chalk;
  verboseTheme: Chalk;
  warnTheme: Chalk;

  constructor() {
    const errFilePath = dirname(logConfig.errPath);
    const logFilePath = dirname(logConfig.logPath);

    try {
      mkdirSync(errFilePath, {recursive: true});
      mkdirSync(logFilePath, {recursive: true});
    } catch (e) {
      console.error('Unable to create log paths', e);
    }

    this.errWriteStream = createWriteStream(logConfig.errPath, {
      flags: 'a',
    });
    this.logWriteStream = createWriteStream(logConfig.logPath, {
      flags: 'a',
    });

    this.debugTheme = chalk.gray;
    this.logTheme = chalk.greenBright;
    this.errorTheme = chalk.red;
    this.verboseTheme = chalk.blueBright;
    this.warnTheme = chalk.rgb(255, 153, 0);
  }

  debug(message: any, context?: string): any {
    const msg = AppLoggerService.getFormattedMessage(this.debugTheme, message, context);
    this.logWriteStream.write(message);
    console.debug(msg.substr(0, msg.length - 1));
  }

  error(message: any, trace?: string, context?: string): any {
    const msg = AppLoggerService.getFormattedMessage(this.errorTheme, message, context);
    this.errWriteStream.write(AppLoggerService.getFormattedMessage(this.errorTheme, message, context, trace));
    console.error(msg.substr(0, msg.length - 1), trace);
  }

  log(message: any, context?: string): any {
    const msg = AppLoggerService.getFormattedMessage(this.logTheme, message, context);
    this.logWriteStream.write(AppLoggerService.getFormattedMessage(this.logTheme, message, context));
    console.log(msg.substr(0, msg.length - 1));
  }

  verbose(message: any, context?: string): any {
    const msg = AppLoggerService.getFormattedMessage(this.verboseTheme, message, context);
    this.logWriteStream.write(AppLoggerService.getFormattedMessage(this.verboseTheme, message, context));
    console.log(msg.substr(0, msg.length - 1));
  }

  warn(message: any, context?: string): any {
    const msg = AppLoggerService.getFormattedMessage(this.warnTheme, message, context);
    this.logWriteStream.write(AppLoggerService.getFormattedMessage(this.warnTheme, message, context));
    console.warn(msg.substr(0, msg.length - 1));
  }

  static getFormattedDate() {
    return moment().format('YYYY-MM-DD hh:mm');
  }

  static getFormattedMessage(theme: Chalk, message: string, context: string, trace?: string) {
    // tslint:disable-next-line:max-line-length
    return `${theme('[comiko-app] ' + process.pid)} - ${AppLoggerService.getFormattedDate()}   ${theme('[' + context + ']')} ${theme(message)} ${trace ? '\n' + trace : ''}
`;
  }
}
