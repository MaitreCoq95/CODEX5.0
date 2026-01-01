/**
 * Custom error classes for the Analytics API
 */
export declare class ApiError extends Error {
    statusCode: number;
    code: string;
    constructor(message: string, statusCode?: number, code?: string);
}
export declare class NotFoundError extends ApiError {
    constructor(resource: string, id?: string);
}
export declare class ValidationError extends ApiError {
    constructor(message: string);
}
export declare class UnauthorizedError extends ApiError {
    constructor(message?: string);
}
export declare class ForbiddenError extends ApiError {
    constructor(message?: string);
}
export declare class ConflictError extends ApiError {
    constructor(message: string);
}
export declare class RateLimitError extends ApiError {
    constructor(message?: string);
}
/**
 * Error handler for Fastify
 */
export declare function handleError(error: unknown): {
    statusCode: number;
    body: {
        success: false;
        error: string;
        code: string;
        details?: unknown;
    };
};
//# sourceMappingURL=errors.d.ts.map