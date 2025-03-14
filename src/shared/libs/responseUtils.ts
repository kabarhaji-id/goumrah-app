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
    }, { status: 200 });
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
        code, // ✅ Return the actual error code here (but not as HTTP status)
        message
    }, { status: 200 }); // ✅ Always return HTTP 200
}
