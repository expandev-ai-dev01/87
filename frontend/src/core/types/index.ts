/**
 * @module CoreTypes
 * @summary Global type definitions for the application
 */

/**
 * @type ApiResponse
 * @summary Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * @type PaginatedResponse
 * @summary Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * @type ApiError
 * @summary Standard API error structure
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}
