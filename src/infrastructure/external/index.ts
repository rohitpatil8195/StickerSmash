/**
 * External Services Integration
 * API clients, databases, third-party services
 */

export interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
  put<T>(url: string, data: unknown): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

export interface ILogger {
  info(message: string): void;
  error(message: string, error?: Error): void;
  warn(message: string): void;
}
