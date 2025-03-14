/**
 * Base class for all authentication-related errors.
 */
export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthError";

        // ✅ Remove the stack trace to prevent Next.js from logging the error in console
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

/**
 * Thrown when a user is not found in the system.
 */
export class UserNotFoundError extends AuthError {
    constructor() {
        super("User not found.");
    }
}

/**
 * Thrown when the provided password is incorrect.
 */
export class InvalidPasswordError extends AuthError {
    constructor() {
        super("Invalid password.");
    }
}

/**
 * Thrown when the user is not authorized to access a resource.
 */
export class UnauthorizedError extends AuthError {
    constructor() {
        super("You are not authorized to perform this action.");
    }
}

/**
 * Thrown when an email is already registered in the system.
 */
export class EmailAlreadyExistsError extends AuthError {
    constructor() {
        super("Email already exists.");
    }
}

/**
 * Thrown when the provided JWT token is invalid or tampered with.
 */
export class InvalidTokenError extends AuthError {
    constructor() {
        super("Invalid token.");
    }
}

/**
 * Thrown when the JWT token has expired.
 */
export class TokenExpiredError extends AuthError {
    constructor() {
        super("Token has expired.");
    }
}

/**
 * Thrown when input validation fails (e.g., missing required fields).
 */
export class ValidationError extends AuthError {
    constructor(message: string = "Invalid input data.") {
        super(message);
    }
}

