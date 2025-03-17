import { ErrorCode } from "@/shared/error/error-types";
import { errorResponse } from "@/shared/libs/responseUtils";
import { NextResponse } from "next/server";

/**
 * Base class for handling all App-Level Errors
 */
class AppError extends Error {
    errorCode: (typeof ErrorCode)[keyof typeof ErrorCode];

    /**
     * Creates an instance of AppError.
     * @param {string} message - Error message
     * @param {ErrorCode} errorCode - Custom error code
     */
    constructor(message: string, errorCode: (typeof ErrorCode)[keyof typeof ErrorCode]) {
        super(message);
        this.errorCode = errorCode;

        // Preserve stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

// ✅ General Errors

/**
 * Error for database-related issues
 */
export class DatabaseError extends AppError {
    constructor(message = "Database error.") {
        super(message, ErrorCode.DATABASE_ERROR);
    }
}

/**
 * Error for validation failures
 */
export class ValidationError extends AppError {
    constructor(message = "Invalid input.") {
        super(message, ErrorCode.VALIDATION_ERROR);
    }
}

/**
 * Error for authentication failures
 */
export class AuthenticationError extends AppError {
    constructor(message = "Authentication failed.") {
        super(message, ErrorCode.AUTHENTICATION_ERROR);
    }
}

/**
 * Error for unauthorized access
 */
export class AuthorizationError extends AppError {
    constructor(message = "Unauthorized access.") {
        super(message, ErrorCode.AUTHORIZATION_ERROR);
    }
}

/**
 * Error for service-level issues
 */
export class ServiceError extends AppError {
    constructor(message = "Service error.") {
        super(message, ErrorCode.SERVICE_ERROR);
    }
}

/**
 * Error for rate-limiting issues
 */
export class RateLimitError extends AppError {
    constructor(message = "Too many requests.") {
        super(message, ErrorCode.RATE_LIMIT_ERROR);
    }
}

/**
 * Error for external API failures
 */
export class ExternalApiError extends AppError {
    constructor(message = "External API error.") {
        super(message, ErrorCode.EXTERNAL_API_ERROR);
    }
}

/**
 * Error for parsing failures
 */
export class ParsingError extends AppError {
    constructor(message = "Parsing error.") {
        super(message, ErrorCode.PARSING_ERROR);
    }
}

/**
 * Error for cache-related issues
 */
export class CacheError extends AppError {
    constructor(message = "Cache error.") {
        super(message, ErrorCode.CACHE_ERROR);
    }
}

/**
 * Error for file processing failures
 */
export class FileProcessingError extends AppError {
    constructor(message = "File processing error.") {
        super(message, ErrorCode.FILE_PROCESSING_ERROR);
    }
}

/**
 * Error for expired tokens
 */
export class TokenExpiredError extends AppError {
    constructor(message = "Token expired.") {
        super(message, ErrorCode.TOKEN_EXPIRED);
    }
}

/**
 * Error for duplicate data entry
 */
export class DuplicateEntryError extends AppError {
    constructor(message = "Duplicate entry.") {
        super(message, ErrorCode.DUPLICATE_ENTRY);
    }
}

/**
 * Error for concurrency conflicts
 */
export class ConcurrencyError extends AppError {
    constructor(message = "Concurrency error.") {
        super(message, ErrorCode.CONCURRENCY_ERROR);
    }
}

/**
 * Error for unsupported media type
 */
export class UnsupportedMediaTypeError extends AppError {
    constructor(message = "Unsupported media type.") {
        super(message, ErrorCode.UNSUPPORTED_MEDIA_TYPE);
    }
}

// ✅ RBAC & User-Specific Errors

/**
 * Error when user is not found
 */
export class UserNotFoundError extends AppError {
    constructor(message = "User not found.") {
        super(message, ErrorCode.USER_NOT_FOUND);
    }
}

/**
 * Error when the user's role is not allowed
 */
export class RoleNotAllowedError extends AppError {
    constructor(message = "Role not allowed.") {
        super(message, ErrorCode.ROLE_NOT_ALLOWED);
    }
}

/**
 * Error for invalid password
 */
export class InvalidPasswordError extends AppError {
    constructor(message = "Invalid password.") {
        super(message, ErrorCode.PASSWORD_INVALID);
    }
}

// ✅ Tambahkan ConflictError
export class ConflictError extends AppError {
    constructor(message = "Conflict error.") {
        super(message, ErrorCode.DUPLICATE_ENTRY);
    }
}

// ✅ Tambahkan UnauthorizedError
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized access.") {
        super(message, ErrorCode.AUTHORIZATION_ERROR);
    }
}

/**
 * Error for invalid token
 */
export class InvalidTokenError extends AppError {
    constructor(message = "Invalid token.") {
        super(message, ErrorCode.TOKEN_INVALID);
    }
}

/**
 * Error for insufficient permissions
 */
export class PermissionDeniedError extends AppError {
    constructor(message = "Permission denied.") {
        super(message, ErrorCode.PERMISSION_DENIED);
    }
}

// ✅ Internal Service Error

/**
 * Error for internal service failures
 */
export class InternalServiceError extends AppError {
    constructor(message = "Internal service error.") {
        super(message, ErrorCode.INTERNAL_SERVICE_ERROR);
    }
}

/**
 * Global Error Handler for handling all App-Level and Unexpected Errors
 *
 * @param {unknown} error - The error object thrown in the application
 * @returns {NextResponse} - Returns a consistent error response
 */
export const handleError = (error: unknown): NextResponse => {
    let errorCode: (typeof ErrorCode)[keyof typeof ErrorCode] = ErrorCode.INTERNAL_SERVICE_ERROR;
    let message = "Internal server error.";

    // ✅ Handle App-Level Error
    if (error instanceof AppError) {
        message = error.message;
        errorCode = error.errorCode;
    }

    // ✅ Handle Unexpected Error (e.g., from external libraries)
    if (error instanceof Error) {
        message = error.message || message;
    }

    // ✅ Return response with consistent error format
    return errorResponse(errorCode, message);
};
