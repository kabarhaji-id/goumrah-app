import jwt, { JwtPayload } from "jsonwebtoken";
import { Users } from "@/modules/auth/domain/users";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
}
const JWT_MAX_AGE: number = 7 * 24 * 60 * 60; // 7 hari

/**
 * Hashes a password using bcrypt.
 * @param password - The plaintext password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

/**
 * Compares a plaintext password with a hashed password.
 * @param password - The plaintext password.
 * @param hashedPassword - The hashed password.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Struktur payload JWT
 */
interface TokenPayload extends JwtPayload {
    id: string;
    email: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    image: string | null;
    role: string;
}

/**
 * 🔑 Generate JWT Token untuk user
 * @param user - Data pengguna dari database
 * @returns Token JWT dalam bentuk string
 */
export function generateJWTToken(user: Users): string {
    const payload: TokenPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        phone: user.phone,
        role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_MAX_AGE });
}

/**
 * ✅ Verifikasi Token JWT
 * @param token - Token JWT yang dikirim oleh user
 * @returns TokenPayload jika valid, null jika tidak valid
 */
export function verifyJWTToken(token: string): TokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        console.error("JWT Verification Error:", error); // ✅ Menggunakan error
        return null;
    }
}


const TOKEN_KEY = "accessToken";

/**
 * ✅ Save token to local storage
 */
export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

/**
 * ✅ Get token from local storage
 */
export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * ✅ Remove token (Logout)
 */
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};
