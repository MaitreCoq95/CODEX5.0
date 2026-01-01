"use strict";
/**
 * Custom error classes for the Analytics API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.ConflictError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.NotFoundError = exports.ApiError = void 0;
exports.handleError = handleError;
class ApiError extends Error {
    statusCode;
    code;
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.code = code;
    }
}
exports.ApiError = ApiError;
class NotFoundError extends ApiError {
    constructor(resource, id) {
        super(id ? `${resource} with id '${id}' not found` : `${resource} not found`, 404, 'NOT_FOUND');
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends ApiError {
    constructor(message) {
        super(message, 400, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends ApiError {
    constructor(message = 'Access denied') {
        super(message, 403, 'FORBIDDEN');
        this.name = 'ForbiddenError';
    }
}
exports.ForbiddenError = ForbiddenError;
class ConflictError extends ApiError {
    constructor(message) {
        super(message, 409, 'CONFLICT');
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class RateLimitError extends ApiError {
    constructor(message = 'Too many requests') {
        super(message, 429, 'RATE_LIMIT');
        this.name = 'RateLimitError';
    }
}
exports.RateLimitError = RateLimitError;
/**
 * Error handler for Fastify
 */
function handleError(error) {
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
        const prismaError = error;
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
//# sourceMappingURL=errors.js.map