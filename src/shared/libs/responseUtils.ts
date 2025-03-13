import { NextResponse } from "next/server";

/**
 * Helper untuk membuat response JSON sukses.
 * @param code - Status kode HTTP.
 * @param data - Data yang dikirimkan dalam response.
 * @returns NextResponse JSON
 */
export function successResponse<T>(code: number, data: T) {
    return NextResponse.json({
        status: true,
        code,
        data
    }, { status: code });
}

/**
 * Helper untuk membuat response JSON error.
 * @param code - Status kode HTTP.
 * @param message - Pesan error yang akan dikirimkan.
 * @returns NextResponse JSON
 */
export function errorResponse(code: number, message: string) {
    return NextResponse.json({
        status: false,
        code,
        message
    }, { status: code });
}
