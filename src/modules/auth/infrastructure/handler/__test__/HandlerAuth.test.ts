import { NextRequest } from "next/server";
import { authHandler } from "@/modules/auth/infrastructure/handler/HandlerAuth";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { comparePassword, generateJWTToken, hashPassword, verifyJWTToken } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { Role } from "@/modules/auth/domain/role";
import { cookies } from "next/headers";
import {
    UserNotFoundError,
    EmailAlreadyExistsError,
    UnauthorizedError,
    ValidationError,
} from "@/modules/auth/domain/authExceptions";

// Mock dependencies
jest.mock("@/modules/auth/infrastructure/usersRepository");
jest.mock("@/modules/auth/infrastructure/utils/sessionUtils");
jest.mock("next/headers", () => ({ cookies: jest.fn() }));

const mockUserRepo = new UsersRepository();

const sampleUser = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "test@example.com",
    password: "hashedPassword",
    role: Role.REGISTERED_USER,
    token: "validToken",
};
process.env.JWT_SECRET = "mySuperSecretKey";
const createRequest = (body: object, headers: Record<string, string> = {}) => ({
    json: jest.fn().mockResolvedValue(body),
    headers: new Headers(headers),
} as unknown as NextRequest);

describe("AuthHandler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("login", () => {
        it("should successfully login with valid credentials", async () => {
            const req = createRequest({ identifier: "test@example.com", password: "password" });
            (mockUserRepo.getUsersByField as jest.Mock).mockResolvedValue(sampleUser);
            (comparePassword as jest.Mock).mockResolvedValue(true);
            (generateJWTToken as jest.Mock).mockReturnValue("mockToken");

            const response = await authHandler.login(req);

            expect(response.status).toBe(200);
        });

        it("should throw validation error when missing credentials", async () => {
            const req = createRequest({ identifier: "", password: "" });

            await expect(authHandler.login(req)).rejects.toThrow(ValidationError);
        });

        it("should throw UserNotFoundError when user is not found", async () => {
            const req = createRequest({ identifier: "test@example.com", password: "password" });
            (mockUserRepo.getUsersByField as jest.Mock).mockResolvedValue(null);

            await expect(authHandler.login(req)).rejects.toThrow(UserNotFoundError);
        });
    });

    describe("register", () => {
        it("should successfully register a new user", async () => {
            const req = createRequest({
                firstName: "John",
                lastName: "Doe",
                identifier: "test@example.com",
                password: "password123",
            });

            (mockUserRepo.getUsersByField as jest.Mock).mockResolvedValue(null);
            (hashPassword as jest.Mock).mockResolvedValue("hashedPassword");
            (mockUserRepo.createUsers as jest.Mock).mockResolvedValue(sampleUser);

            const response = await authHandler.register(req);

            expect(response.status).toBe(201);
        });

        it("should throw EmailAlreadyExistsError if email already exists", async () => {
            const req = createRequest({
                firstName: "John",
                lastName: "Doe",
                identifier: "test@example.com",
                password: "password123",
            });

            (mockUserRepo.getUsersByField as jest.Mock).mockResolvedValue(sampleUser);

            await expect(authHandler.register(req)).rejects.toThrow(EmailAlreadyExistsError);
        });
    });

    describe("logout", () => {
        it("should successfully logout the user", async () => {
            const req = createRequest({}, { Authorization: "Bearer validToken" });
            (verifyJWTToken as jest.Mock).mockReturnValue(sampleUser);
            (mockUserRepo.clearUserToken as jest.Mock).mockResolvedValue(true);

            const response = await authHandler.logout(req);

            expect(response.status).toBe(200);
        });

        it("should throw UnauthorizedError if no token is provided", async () => {
            const req = createRequest({}, {});

            await expect(authHandler.logout(req)).rejects.toThrow(UnauthorizedError);
        });
    });

    describe("getUser", () => {
        it("should return user data when valid header is provided", async () => {
            const req = createRequest({}, { user: JSON.stringify(sampleUser) });

            const response = await authHandler.getUser(req);

            expect(response.status).toBe(200);
        });

        it("should throw UnauthorizedError if no user data is provided", async () => {
            const req = createRequest({}, {});

            await expect(authHandler.getUser(req)).rejects.toThrow(UnauthorizedError);
        });
    });

    describe("getToken", () => {
        it("should return token from cookies", async () => {
            (cookies as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue({ value: "validToken" }) });

            const response = await authHandler.getToken();

            expect(response.status).toBe(200);
        });

        it("should throw UnauthorizedError if no token is found in cookies", async () => {
            (cookies as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue(null) });

            await expect(authHandler.getToken()).rejects.toThrow(UnauthorizedError);
        });
    });
});
