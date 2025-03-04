export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthError";
    }
}

export class UserNotFoundError extends AuthError {
    constructor() {
        super("User not found.");
    }
}

export class InvalidPasswordError extends AuthError {
    constructor() {
        super("Invalid password.");
    }
}

export class UnauthorizedError extends AuthError {
    constructor() {
        super("You are not authorized to perform this action.");
    }
}
