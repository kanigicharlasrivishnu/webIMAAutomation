import fs from 'fs';
import path from 'path';
import { env } from '../config/environment';

export interface LogEntry {
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  testCaseId?: string;
  step?: string;
  message: string;
  details?: Record<string, any>;
  url?: string;
  locator?: string;
}

export class Logger {
  private static logFilePath = path.resolve(process.cwd(), 'logs', 'automation.log');
  private static jsonLogFilePath = path.resolve(process.cwd(), 'logs', 'automation.json');

  private testCaseId?: string;

  constructor(testCaseId?: string) {
    this.testCaseId = testCaseId;
  }

  public setTestCaseId(id: string): void {
    this.testCaseId = id;
  }

  private redact(content: any): any {
    if (!env.REDACT_SECRETS || !content) return content;

    if (typeof content === 'string') {
      return content
        // Redact 16-digit card numbers
        .replace(/\b(?:\d[ -]*?){13,16}\b/g, '****-****-****-XXXX')
        // Redact passwords & tokens in strings
        .replace(/(password|pwd|token|apiKey|secret)[:=]\s*([^\s,;]+)/gi, '$1=******');
    }

    if (typeof content === 'object') {
      const sanitized: Record<string, any> = Array.isArray(content) ? [] : {};
      for (const [key, val] of Object.entries(content)) {
        if (/password|pwd|token|apiKey|secret|pan|cardnumber/i.test(key)) {
          sanitized[key] = '******';
        } else if (typeof val === 'object' && val !== null) {
          sanitized[key] = this.redact(val);
        } else {
          sanitized[key] = typeof val === 'string' ? this.redact(val) : val;
        }
      }
      return sanitized;
    }

    return content;
  }

  private write(level: LogEntry['level'], message: string, details?: Record<string, any>, step?: string): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      testCaseId: this.testCaseId,
      step,
      message: this.redact(message),
      details: details ? this.redact(details) : undefined
    };

    const formattedConsole = `[${entry.timestamp}] [${entry.level}] ${entry.testCaseId ? `[${entry.testCaseId}] ` : ''}${entry.step ? `(Step: ${entry.step}) ` : ''}${entry.message}`;

    if (level === 'ERROR') {
      console.error(formattedConsole, details ? details : '');
    } else if (level === 'WARN') {
      console.warn(formattedConsole, details ? details : '');
    } else {
      console.log(formattedConsole, details ? details : '');
    }

    try {
      fs.appendFileSync(Logger.logFilePath, formattedConsole + (details ? ` ${JSON.stringify(entry.details)}` : '') + '\n');
      fs.appendFileSync(Logger.jsonLogFilePath, JSON.stringify(entry) + '\n');
    } catch {
      // Ignore file writing errors in constrained runtimes
    }
  }

  public debug(message: string, details?: Record<string, any>, step?: string): void {
    if (env.LOG_LEVEL === 'DEBUG') {
      this.write('DEBUG', message, details, step);
    }
  }

  public info(message: string, details?: Record<string, any>, step?: string): void {
    this.write('INFO', message, details, step);
  }

  public warn(message: string, details?: Record<string, any>, step?: string): void {
    this.write('WARN', message, details, step);
  }

  public error(message: string, details?: Record<string, any>, step?: string): void {
    this.write('ERROR', message, details, step);
  }
}

export const defaultLogger = new Logger();
