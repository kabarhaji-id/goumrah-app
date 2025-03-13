import { NextResponse } from "next/server";
import {
    AuthError,
    InvalidPasswordError,
    UserNotFoundError,
    ValidationError
} from "@/modules/auth/domain/authExceptions";

/**
 * Global error handler for authentication-related operations.
 * Handles specific AuthError exceptions and returns appropriate HTTP responses.
 * @param error - The caught error instance.
 * @returns NextResponse
 */

export function authErrorHandler(error: unknown): NextResponse {
    if (error instanceof UserNotFoundError) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error instanceof InvalidPasswordError) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof AuthError) {
        return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
