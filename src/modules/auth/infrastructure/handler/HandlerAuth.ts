import { NextRequest, NextResponse } from "next/server";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { comparePassword, generateJWTToken, hashPassword, verifyJWTToken } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { Role } from "@/modules/auth/domain/role";
import { successResponse } from "@/shared/libs/responseUtils";
import { ForgotPasswordService } from "@/modules/auth/application/forgotPasswordService";
import { OTPRepository } from "@/modules/email/infrastructure/OtpRepository";
import { MailchimpEmailService } from "@/modules/email/application/emailServiceMailchimp";
import { WhatsAppService } from "@/modules/email/application/WhatsappService";
import { cookies } from "next/headers";
import {
    UserNotFoundError,
    InvalidPasswordError,
    EmailAlreadyExistsError,
    UnauthorizedError,
    ValidationError,
    InvalidTokenError,
} from "@/modules/auth/domain/authExceptions";

/**
 * AuthHandler class responsible for handling authentication logic.
 */
class AuthHandler {
    private userRepo: UsersRepository;
    private forgotPasswordService: ForgotPasswordService;

    constructor() {
        const usersRepo = new UsersRepository();
        const otpRepo = new OTPRepository();
        const emailService = new MailchimpEmailService();
        const whatsappService = new WhatsAppService();

        this.userRepo = usersRepo;
        this.forgotPasswordService = new ForgotPasswordService(usersRepo, otpRepo, emailService, whatsappService);
    }

    /**
     * Handles user login and generates a JWT token.
     * @param {NextRequest} req - The incoming request with login credentials.
     * @returns {Promise<NextResponse>}
     */
    async login(req: NextRequest): Promise<NextResponse> {
        const { identifier, password } = await req.json();
        if (!identifier || !password) throw new ValidationError("Email or password is required.");

        const field = this.getIdentifierType(identifier);
        const user = await this.userRepo.getUsersByField(field, identifier);
        if (!user || !user.password) throw new UserNotFoundError();

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new InvalidPasswordError();

        const token = generateJWTToken(user);
        await this.userRepo.updateUserToken(user.id, token);

        const response = successResponse(200, { user, token });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return response;
    }

    /**
     * Handles user registration.
     * @param {NextRequest} req - The incoming request with user registration data.
     * @returns {Promise<NextResponse>}
     */
    async register(req: NextRequest): Promise<NextResponse> {
        const { firstName, lastName, identifier, password } = await req.json();
        if (!firstName || !lastName || !identifier || !password) {
            throw new ValidationError("All fields are required.");
        }

        const existingUser = await this.userRepo.getUsersByField("email", identifier);
        if (existingUser) throw new EmailAlreadyExistsError();

        const hashedPassword = await hashPassword(password);
        const newUser = await this.userRepo.createUsers({
            firstName,
            lastName,
            username: identifier,
            email: identifier,
            phone: null,
            password: hashedPassword,
            emailVerified: null,
            image: null,
            role: Role.REGISTERED_USER,
            token: null,
        });

        return successResponse(201, { user: newUser });
    }

    /**
     * Handles forgot password request.
     * @param {NextRequest} req - The request containing user email or phone number.
     * @returns {Promise<NextResponse>}
     */
    async forgotPassword(req: NextRequest): Promise<NextResponse> {
        const { identifier } = await req.json();
        if (!identifier) throw new ValidationError("Email or phone number is required.");

        const { success, message } = await this.forgotPasswordService.requestPasswordReset(identifier);
        if (!success) throw new ValidationError(message);

        return successResponse(200, { message });
    }

    /**
     * Handles user logout by clearing the token.
     * @param {NextRequest} req - The request with the token to be cleared.
     * @returns {Promise<NextResponse>}
     */
    async logout(req: NextRequest): Promise<NextResponse> {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) throw new UnauthorizedError();

        const user = verifyJWTToken(token);
        if (!user) throw new InvalidTokenError();

        await this.userRepo.clearUserToken(user.id);
        return successResponse(200, "Logout successful.");
    }

    /**
     * Retrieves user information based on the provided token.
     * @param {NextRequest} req - The request from the client.
     * @returns {Promise<NextResponse>}
     */
    async getUser(req: NextRequest): Promise<NextResponse> {
        const user = JSON.parse(req.headers.get("user") || "{}");
        if (!user || !user.id) throw new UnauthorizedError();

        return successResponse(200, { user });
    }


    /**
     * Retrieves token from cookies.
     * @returns {Promise<NextResponse>}
     */
    async getToken(): Promise<NextResponse> {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) throw new UnauthorizedError();

        return successResponse(200, { token });
    }

    /**
     * Helper untuk menentukan tipe identifier (email, phone, atau username).
     * @param {string} identifier - Email, username, atau nomor telepon.
     * @returns {"email" | "phone" | "username"} Tipe field yang sesuai.
     */
    private getIdentifierType(identifier: string): "username" | "phone" | "email" {
        if (identifier.includes("@")) return "email";
        if (/^\d+$/.test(identifier)) return "phone";
        return "username";
    }
}

export const authHandler = new AuthHandler();
