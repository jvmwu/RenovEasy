// API 监控和日志记录 - 符合API约束规范

/**
 * API 请求日志接口
 */
export interface ApiRequestLog {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: any;
  timestamp: number;
  duration?: number;
  status?: number;
  response?: any;
  error?: any;
}

/**
 * API 监控器
 */
export class ApiMonitor {
  private static instance: ApiMonitor;
  private logs: ApiRequestLog[] = [];
  private maxLogs = 100; // 最多保存100条日志

  private constructor() {}

  static getInstance(): ApiMonitor {
    if (!ApiMonitor.instance) {
      ApiMonitor.instance = new ApiMonitor();
    }
    return ApiMonitor.instance;
  }

  /**
   * 记录请求开始
   */
  logRequestStart(method: string, url: string, headers: Record<string, string>, body?: any): string {
    const id = this.generateId();
    const log: ApiRequestLog = {
      id,
      method: method.toUpperCase(),
      url,
      headers: { ...headers },
      body: this.sanitizeBody(body),
      timestamp: Date.now(),
    };

    this.addLog(log);

    if (__DEV__) {
      console.log(`🚀 [${id}] API Request: ${method.toUpperCase()} ${url}`, {
        headers,
        body: this.sanitizeBody(body),
      });
    }

    return id;
  }

  /**
   * 记录请求完成
   */
  logRequestEnd(id: string, status: number, response?: any, error?: any): void {
    const log = this.logs.find(l => l.id === id);
    if (log) {
      log.duration = Date.now() - log.timestamp;
      log.status = status;
      log.response = this.sanitizeResponse(response);
      log.error = error;

      if (__DEV__) {
        if (error) {
          console.error(`❌ [${id}] API Error: ${log.method} ${log.url}`, {
            status,
            duration: log.duration,
            error,
          });
        } else {
          console.log(`✅ [${id}] API Response: ${log.method} ${log.url}`, {
            status,
            duration: log.duration,
            response: this.sanitizeResponse(response),
          });
        }
      }
    }
  }

  /**
   * 获取所有日志
   */
  getLogs(): ApiRequestLog[] {
    return [...this.logs];
  }

  /**
   * 获取错误日志
   */
  getErrorLogs(): ApiRequestLog[] {
    return this.logs.filter(log => log.error || (log.status && log.status >= 400));
  }

  /**
   * 获取慢请求日志
   */
  getSlowLogs(threshold: number = 3000): ApiRequestLog[] {
    return this.logs.filter(log => log.duration && log.duration > threshold);
  }

  /**
   * 清除日志
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * 获取统计信息
   */
  getStats(): {
    total: number;
    success: number;
    error: number;
    averageResponseTime: number;
    slowRequests: number;
  } {
    const total = this.logs.length;
    const success = this.logs.filter(log => log.status && log.status < 400).length;
    const error = this.logs.filter(log => log.error || (log.status && log.status >= 400)).length;
    const slowRequests = this.getSlowLogs().length;
    
    const totalDuration = this.logs
      .filter(log => log.duration)
      .reduce((sum, log) => sum + (log.duration || 0), 0);
    
    const averageResponseTime = total > 0 ? totalDuration / total : 0;

    return {
      total,
      success,
      error,
      averageResponseTime,
      slowRequests,
    };
  }

  /**
   * 添加日志
   */
  private addLog(log: ApiRequestLog): void {
    this.logs.push(log);
    
    // 保持日志数量在限制内
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  /**
   * 生成唯一ID
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }

  /**
   * 清理请求体中的敏感信息
   */
  private sanitizeBody(body: any): any {
    if (!body) return body;
    
    const sensitiveFields = ['password', 'token', 'refreshToken', 'authorization'];
    
    if (typeof body === 'object') {
      const sanitized = { ...body };
      sensitiveFields.forEach(field => {
        if (sanitized[field]) {
          sanitized[field] = '***';
        }
      });
      return sanitized;
    }
    
    return body;
  }

  /**
   * 清理响应中的敏感信息
   */
  private sanitizeResponse(response: any): any {
    if (!response) return response;
    
    if (typeof response === 'object' && response.data) {
      const sanitized = { ...response };
      if (sanitized.data.token) {
        sanitized.data.token = '***';
      }
      if (sanitized.data.refreshToken) {
        sanitized.data.refreshToken = '***';
      }
      return sanitized;
    }
    
    return response;
  }
}

/**
 * 性能监控器
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * 记录性能指标
   */
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // 保持最近100个值
    if (values.length > 100) {
      values.shift();
    }
  }

  /**
   * 获取指标统计
   */
  getMetricStats(name: string): {
    count: number;
    average: number;
    min: number;
    max: number;
    p95: number;
  } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) {
      return null;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const count = values.length;
    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / count;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const p95Index = Math.floor(count * 0.95);
    const p95 = sorted[p95Index];

    return { count, average, min, max, p95 };
  }

  /**
   * 获取所有指标
   */
  getAllMetrics(): Record<string, ReturnType<typeof this.getMetricStats>> {
    const result: Record<string, ReturnType<typeof this.getMetricStats>> = {};
    
    for (const [name] of this.metrics) {
      result[name] = this.getMetricStats(name);
    }
    
    return result;
  }

  /**
   * 清除指标
   */
  clearMetrics(): void {
    this.metrics.clear();
  }
}

// 导出单例实例
export const apiMonitor = ApiMonitor.getInstance();
export const performanceMonitor = PerformanceMonitor.getInstance();
