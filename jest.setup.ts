// Extend Jest with additional matchers from `@testing-library/jest-dom`
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

// ✅ Mock Next.js Router (useful for testing components using `next/navigation`)
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        pathname: "/",
        query: {},
        asPath: "/",
    }),
}));

// ✅ Mock Next.js App Router API (e.g., `NextResponse` and `NextRequest`)
jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data: Record<string, any>) => ({ json: () => data })),
    },
    NextRequest: jest.fn(),
}));

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
        init: jest.fn(),
        pageView: jest.fn(),
    },
}));

// ✅ Mock Prisma Client to prevent actual database access
jest.mock("@prisma/client", () => {
    const mockPrisma = {
        user: {
            findUnique: jest.fn(),   // Read one
            findMany: jest.fn(),     // Read all
            create: jest.fn(),       // Create
            update: jest.fn(),       // Update
            delete: jest.fn(),       // Delete
        },
    };
    return { PrismaClient: jest.fn(() => mockPrisma) };
});


// ✅ Mock NextAuth.js (authentication)
jest.mock("next-auth/react", () => ({
    useSession: jest.fn(() => ({
        data: null,
        status: "unauthenticated",
    })),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

// ✅ Mock JWT (JSON Web Token) for authentication
jest.mock("next-auth/jwt", () => ({
    getToken: jest.fn(() => Promise.resolve(null)), // Returns null by default
}));

// ✅ Suppress console warnings/errors during tests (optional)
global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn(),
};
