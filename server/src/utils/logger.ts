import { Request, Response, NextFunction } from 'express';

export interface LogEntry {
  timestamp: string;
  method: string;
  url: string;
  statusCode?: number;
  responseTime?: number;
  userAgent?: string;
  ip: string;
  userId?: number;
  error?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  log(entry: LogEntry): void {
    this.logs.unshift(entry);
    
    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Console output in development
    if (process.env.NODE_ENV === 'development') {
      const { timestamp, method, url, statusCode, responseTime, userId } = entry;
      const userInfo = userId ? ` [User: ${userId}]` : '';
      const timeInfo = responseTime ? ` (${responseTime}ms)` : '';
      const status = statusCode ? ` - ${statusCode}` : '';
      
      console.log(`${timestamp} ${method} ${url}${status}${timeInfo}${userInfo}`);
    }
  }

  error(message: string, details?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      method: 'ERROR',
      url: '',
      ip: '',
      error: message
    };

    this.log(entry);
    console.error(`❌ ${message}`, details || '');
  }

  info(message: string, details?: any): void {
    console.log(`ℹ️  ${message}`, details || '');
  }

  warn(message: string, details?: any): void {
    console.warn(`⚠️  ${message}`, details || '');
  }

  success(message: string, details?: any): void {
    console.log(`✅ ${message}`, details || '');
  }

  getLogs(limit: number = 100): LogEntry[] {
    return this.logs.slice(0, limit);
  }

  getStats(): {
    totalRequests: number;
    errorCount: number;
    averageResponseTime: number;
    topEndpoints: Array<{ url: string; count: number }>;
  } {
    const totalRequests = this.logs.length;
    const errorCount = this.logs.filter(log => log.statusCode && log.statusCode >= 400).length;
    
    const responseTimes = this.logs
      .filter(log => log.responseTime)
      .map(log => log.responseTime!);
    
    const averageResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
      : 0;

    // Count endpoint frequency
    const endpointCounts: Record<string, number> = {};
    this.logs.forEach(log => {
      const endpoint = `${log.method} ${log.url}`;
      endpointCounts[endpoint] = (endpointCounts[endpoint] || 0) + 1;
    });

    const topEndpoints = Object.entries(endpointCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([url, count]) => ({ url, count }));

    return {
      totalRequests,
      errorCount,
      averageResponseTime: Math.round(averageResponseTime),
      topEndpoints
    };
  }
}

export const logger = new Logger();

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  
  // Capture the original end function
  const originalEnd = res.end;
  
  // Override res.end to capture response time and status
  res.end = function(chunk: any, encoding?: any): Response {
    const responseTime = Date.now() - startTime;
    
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      userId: req.user?.id
    };

    logger.log(logEntry);
    
    // Call the original end function
    return originalEnd.call(this, chunk, encoding);
  };

  next();
}
