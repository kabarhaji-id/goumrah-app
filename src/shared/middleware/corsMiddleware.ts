import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting storage
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

// Rate limiting configuration
const RATE_LIMIT_MAX = 100; // Max requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

/**
 * Get Client IP Address
 */
function getClientIP(req: NextRequest): string {
    const forwardedFor = req.headers.get("x-forwarded-for");
    return forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
}

/**
 * Rate Limiting Middleware
 */
export function rateLimit(req: NextRequest): NextResponse | null {
    const ip = getClientIP(req);
    const currentTime = Date.now();

    const requestRecord = rateLimitMap.get(ip);

    if (!requestRecord) {
        rateLimitMap.set(ip, { count: 1, lastRequest: currentTime });
    } else {
        const timeDiff = currentTime - requestRecord.lastRequest;

        if (timeDiff < RATE_LIMIT_WINDOW) {
            if (requestRecord.count >= RATE_LIMIT_MAX) {
                return NextResponse.json({ error: "Too many requests" }, { status: 429 });
            }
            requestRecord.count++;
        } else {
            // Reset count after window time passes
            rateLimitMap.set(ip, { count: 1, lastRequest: currentTime });
        }
    }

    return null;
}

/**
 * Apply CORS and Security Headers
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_BASE_URL || "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Content Security Policy (CSP)
    response.headers.set(
        "Content-Security-Policy",
        `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' 
            https://api.midtrans.com
            https://*.googleapis.com
            https://www.googletagmanager.com
            https://www.google-analytics.com
            https://connect.facebook.net
            https://static.cloudflareinsights.com
            https://js.twilio.com
            https://*.mailchimp.com
            https://api.whatsapp.com
            https://*.whatsapp.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: 
            https://www.google-analytics.com 
            https://*.fbcdn.net 
            https://*.cloudflare.com 
            https://*.mailchimp.com
            https://*.whatsapp.net
            https://*.whatsapp.com;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' 
            https://api.midtrans.com 
            https://*.googleapis.com 
            https://www.google-analytics.com 
            https://www.facebook.com 
            https://api.twilio.com
            https://*.mailchimp.com
            https://api.whatsapp.com
            wss://web.whatsapp.com;
        frame-src 'self' 
            https://www.google.com 
            https://www.youtube.com 
            https://www.facebook.com 
            https://*.mailchimp.com
            https://*.whatsapp.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        upgrade-insecure-requests;
        `.replace(/\s{2,}/g, " ").trim()
    );

    // Security Headers
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
    response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    response.headers.set("X-Powered-By", "Next.js");

    return response;
}
