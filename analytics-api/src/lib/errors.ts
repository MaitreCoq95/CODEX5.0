/**
 * Custom error classes for the Analytics API
 */

export class ApiError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string, id?: string) {
    super(
      id ? `${resource} with id '${id}' not found` : `${resource} not found`,
      404,
      'NOT_FOUND'
    );
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT');
    this.name = 'RateLimitError';
  }
}

/**
 * Error handler for Fastify
 */
export function handleError(error: unknown): {
  statusCode: number;
  body: {
    success: false;
    error: string;
    code: string;
    details?: unknown;
  };
} {
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      body: {
        success: false,
        error: error.message,
        code: error.code,
      },
    };
  }

  // Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; message: string };
    
    if (prismaError.code === 'P2025') {
      return {
        statusCode: 404,
        body: {
          success: false,
          error: 'Record not found',
          code: 'NOT_FOUND',
        },
      };
    }

    if (prismaError.code === 'P2002') {
      return {
        statusCode: 409,
        body: {
          success: false,
          error: 'Duplicate record',
          code: 'CONFLICT',
        },
      };
    }
  }

  // Generic error
  console.error('Unhandled error:', error);
  
  return {
    statusCode: 500,
    body: {
      success: false,
      error: 'An unexpected error occurred',
      code: 'INTERNAL_ERROR',
    },
  };
}
