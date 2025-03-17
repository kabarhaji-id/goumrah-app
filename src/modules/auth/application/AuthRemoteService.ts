import { NextRequest, NextResponse } from "next/server";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import {
    comparePassword,
    generateJWTToken,
    hashPassword,
    verifyJWTToken
} from "@/modules/auth/infrastructure/utils/sessionUtils";
import { Role } from "@/modules/auth/domain/role";
import { successResponse } from "@/shared/libs/responseUtils";
import { ForgotPasswordService } from "@/modules/auth/application/forgotPasswordService";
import { OTPRepository } from "@/modules/email/infrastructure/OtpRepository";
import { MailchimpEmailService } from "@/modules/email/application/emailServiceMailchimp";
import { WhatsAppService } from "@/modules/email/application/WhatsappService";
import {
    handleError,
    UserNotFoundError,
    ValidationError,
    InvalidPasswordError,
    ConflictError,
    UnauthorizedError
} from "@/shared/error/GlobalErrorHandler";
import { filterUserData } from "@/modules/auth/infrastructure/utils/userHelper";
import { AuthDBService } from "@/modules/auth/application/AuthDbServices";

/**
 * AuthRemoteService class responsible for handling authentication logic.
 */
class AuthRemoteService {
    private userRepo: UsersRepository;
    private forgotPasswordService: ForgotPasswordService;
    private authDbService = AuthDBService;

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
     * @param {NextRequest} req - The incoming request object from Next.js
     * @returns {Promise<NextResponse>} JSON response with user data and token
     */
    async login(req: NextRequest): Promise<NextResponse> {
        try {
            const { identifier, password }: { identifier: string; password: string } = await req.json();

            if (!identifier || !password) {
                throw new ValidationError("Email or password is required.");
            }

            const field = this.getIdentifierType(identifier);
            const user = await this.userRepo.getUsersByField(field, identifier);

            if (!user || !user.password) {
                throw new UserNotFoundError();
            }

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                throw new InvalidPasswordError();
            }

            const token = await generateJWTToken(user);
            await this.userRepo.updateUserToken(user.userId, token);
            const filteredUser = filterUserData(user);

            const response = successResponse(200, { user: filteredUser, token });
            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
                sameSite: "strict",
            });

            return response;

        } catch (error) {
            return handleError(error);
        }
    }

    /**
     * Handles user registration.
     * @param {NextRequest} req - The incoming request with user registration data.
     * @returns {Promise<NextResponse>} JSON response with new user data
     */
    async register(req: NextRequest): Promise<NextResponse> {
        try {
            const { firstName, lastName, identifier, password } = await req.json();

            if (!firstName || !lastName || !identifier || !password) {
                throw new ValidationError("All fields are required.");
            }

            const existingUser = await this.authDbService.login(identifier, password);
            if (existingUser) {
                throw new ConflictError("Email already exists.");
            }

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

        } catch (error) {
            return handleError(error);
        }
    }

    /**
     * Handles forgot password request.
     * @param {NextRequest} req - The request containing user email or phone number.
     * @returns {Promise<NextResponse>} JSON response
     */
    async forgotPassword(req: NextRequest): Promise<NextResponse> {
        try {
            const { identifier } = await req.json();
            if (!identifier) throw new ValidationError("Email or phone number is required.");

            const { success, message } = await this.forgotPasswordService.requestPasswordReset(identifier);
            if (!success) throw new ValidationError(message);

            return successResponse(200, { message });

        } catch (error) {
            return handleError(error);
        }
    }

    /**
     * Retrieves user information from the token.
     * @param {NextRequest} req - The request from the client.
     * @returns {Promise<NextResponse>} JSON response with user data
     */
    async getAuthUser(req: NextRequest): Promise<NextResponse> {
        try {
            const token = req.cookies.get("token")?.value ||
                req.headers.get("Authorization")?.replace("Bearer ", "");

            if (!token) throw new UnauthorizedError();

            const userPayload = await verifyJWTToken(token);
            if (!userPayload || !userPayload.id) throw new UnauthorizedError("Invalid Token");

            const user = await this.userRepo.getUserById(userPayload.userId);
            if (!user) throw new UserNotFoundError();

            return successResponse(200, { user });

        } catch (error) {
            return handleError(error); // ✅ Gunakan global error handler
        }
    }

    /**
     * Determines the identifier type (email, phone, or username).
     * @param {string} identifier - The provided identifier string.
     * @returns {"username" | "phone" | "email"} The identifier type
     */
    getIdentifierType(identifier: string): "username" | "phone" | "email" {
        if (identifier.includes("@")) return "email";
        if (/^\d+$/.test(identifier)) return "phone";
        return "username";
    }
    /**
     * Mendapatkan user berdasarkan ID dari database.
     *
     * @async
     * @function getUserById
     * @param {number} userId - ID dari user yang ingin diambil.
     * @returns {Promise<{ status: number, data: any }>} - Response berisi status dan data user atau pesan error.
     * @throws {NotFoundError} - Jika user tidak ditemukan.
     * @throws {DatabaseError} - Jika terjadi kesalahan pada database.
     */
    async getUserById(userId) {
        try {
            const user = await this.authDbService.getUsersById(userId);

            if (!user) {
                throw new UserNotFoundError("User not found");
            }

            return successResponse(200, user);
        } catch (error) {
            return handleError(error);
        }
    }

}

export const authRemoteServices = new AuthRemoteService();