import { NextResponse } from "next/server";

export function applyCORS(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Origin", "*"); // 🔥 Izinkan semua origin
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // 🔥 Metode yang diperbolehkan
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization"); // 🔥 Header yang diperbolehkan

    return response;
}
