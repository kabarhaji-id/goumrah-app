// Extend Jest with additional matchers from `@testing-library/jest-dom`
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

// ✅ Mock Next.js Router (useful for testing components using `next/navigation`)
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn() as jest.Mock,
        replace: jest.fn() as jest.Mock,
        pathname: "/",
        query: {},
        asPath: "/",
    }),
}));

// ✅ Mock bcryptjs for password hashing & comparing
jest.mock("bcryptjs", () => ({
    hash: jest.fn() as jest.Mock,
    compareSync: jest.fn() as jest.Mock,
}));

// ✅ Mock Next.js App Router API (e.g., `NextResponse` and `NextRequest`)
jest.mock("next/server", () => {
    type HeadersInit = Record<string, string>;

    class MockNextResponse<T> {
        status: number;
        headers: Headers;
        body: T;

        constructor(body: T, init: { status?: number; headers?: HeadersInit } = {}) {
            this.body = body;
            this.status = init.status || 200;
            this.headers = new Headers(init.headers);
        }

        async json(): Promise<T> {
            return this.body;
        }

        static json<T>(data: T, init?: { status: number }): MockNextResponse<T> {
            return new MockNextResponse<T>(data, init);
        }
    }

    return {
        NextResponse: MockNextResponse,
        NextRequest: jest.fn(),
    };
});

// ✅ Mock `next-seo` to prevent unnecessary errors in tests
jest.mock("next-seo", () => ({
    NextSeo: () => null,
}));

// ✅ Mock Google Analytics (to prevent external API calls)
jest.mock("nextjs-google-analytics", () => ({
    Analytics: () => null,
}));

// ✅ Mock Facebook Pixel (to prevent errors in tests)
jest.mock("react-facebook-pixel", () => ({
    default: {
        init: jest.fn() as jest.Mock,
        pageView: jest.fn() as jest.Mock,
    },
}));

// ✅ Mock Prisma Client to prevent actual database access
jest.mock("@prisma/client", () => {
    const mockPrisma = {
        user: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    return { PrismaClient: jest.fn(() => mockPrisma) };
});

// ✅ Suppress console warnings/errors during tests (optional)
global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn(),
};
