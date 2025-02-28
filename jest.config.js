export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },

    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },

    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/index.ts",
        "!src/**/*.d.ts",
        "!src/**/types.ts",
    ],
    coverageDirectory: "coverage",

    // ✅ Add HTML coverage report
    coverageReporters: ["json", "lcov", "text", "clover", "html"],

    // ✅ Set test timeout (optional)
    testTimeout: 30000,
};
