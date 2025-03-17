import { SignJWT, jwtVerify, errors } from "jose";
import bcrypt from "bcryptjs";
import { Users } from "@/modules/auth/domain/users";
import { TokenPayload } from "@/modules/auth/domain/authEntity";
import {
    UnauthorizedError,
    TokenExpiredError,
} from "@/shared/error/GlobalErrorHandler";

// Ambil secret key dari .env
export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT Secret key is not set');
    }

    const enc: Uint8Array = new TextEncoder().encode(secret);
    return enc;
}
/**
 * ✅ Hash password menggunakan bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

/**
 * ✅ Bandingkan password dengan hashed password
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

/**
 * ✅ Generate JWT Token untuk user
 */
export const generateJWTToken = async (user: Users): Promise<string> => {
    const secretKey = getJwtSecretKey();

    const payload: TokenPayload = {
        userId: user.userId,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        role: user.role,
    };

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secretKey);
};

/**
 * ✅ Verifikasi JWT Token
 */
export const verifyJWTToken = async (token: string): Promise<TokenPayload | null> => {
    const secretKey = getJwtSecretKey();

    try {
        const { payload } = await jwtVerify(token, secretKey, {
            algorithms: ['HS256'],
        });

        return payload as TokenPayload;
    } catch (error: unknown) {
        if (error instanceof errors.JWTExpired) {
            throw new TokenExpiredError('Token has expired.');
        }

        if (error instanceof errors.JWSSignatureVerificationFailed) {
            throw new UnauthorizedError('Invalid token signature.');
        }

        console.error('Unexpected error while verifying token:', error);
        throw new Error('Error verifying token.');
    }
};

/**
 * ✅ Refresh token jika hampir expired
 */
export const refreshTokenIfNeeded = async (token: string): Promise<string | null> => {
    const payload = await verifyJWTToken(token);

    if (!payload) return null;

    const now = Math.floor(Date.now() / 1000);
    const exp = payload.exp || 0;

    const isAboutToExpire = exp - now < 3600;

    if (isAboutToExpire) {
        console.log("🔄 Refreshing token...");

        return await generateJWTToken({
            ...payload,
            emailVerified: null,
            password: null,
            token: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    return token;
};

/**
 * Ambil token dari localStorage atau cookies
 */
export const getTokenFromCookies = (): string | null => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));

    console.log("[sessionUtils] All Cookies:", document.cookie); // ✅ Log all cookies
    console.log("[sessionUtils] Token Cookie:", tokenCookie); // ✅ Log the token row

    if (!tokenCookie) {
        console.warn("[sessionUtils] No token found in cookies.");
        return null;
    }

    const token = tokenCookie.split("=")[1];
    console.log("[sessionUtils] Extracted Token:", token); // ✅ Log the final token

    return token || null;
};

/**
 * Simpan token ke cookies
 */
export const saveToken = (token: string): void => {
    document.cookie = `token=${token}; path=/; Secure=${process.env.NODE_ENV === 'production'}; httpOnly:true; SameSite=Strict;`;
};

/**
 * Hapus token dari cookies saat logout
 */
export const removeToken = (): void => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

/**
 * Ambil data user dari cookies yang di-inject oleh middleware
 */
export const getUserFromCookies = (): Users | null => {
    const userData = localStorage.getItem("user");

    if (!userData) {
        console.warn("[sessionUtils] No user data found in LocalStorage.");
        return null;
    }

    try {
        return JSON.parse(userData) as Users;
    } catch (error) {
        console.error("[sessionUtils] Error parsing user data:", error);
        return null;
    }
};

/**
 * Hapus user dari cookies saat logout
 */
/**
 * Hapus user dari cookies saat logout
 */
export const removeUserFromCookies = (): boolean => {
    try {
        localStorage.removeItem("user");
        return true; // Successfully removed
    } catch (error) {
        console.error("[sessionUtils] Failed to remove user from LocalStorage:", error);
        return false; // Failed to remove
    }
};
