/**
 * Common Types and Interfaces
 */

export interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}
