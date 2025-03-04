import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 30 * 1000, // 30 seconds per test
    expect: { timeout: 5000 }, // Assertion timeout
    fullyParallel: true,
    retries: 2, // Retry failed tests (max 2 times)
    reporter: 'html', // HTML reporter
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        headless: true, // Headless for CI/CD
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'Mobile Chrome (Pixel 5)',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Chrome (Samsung Galaxy S23 Ultra)',
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 1440, height: 3088 },
                userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            },
        },
        {
            name: 'Mobile Chrome (Samsung Galaxy Z Fold 5)',
            use: {
                ...devices['Galaxy Fold'],
                viewport: { width: 1812, height: 2176 },
                userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-F946U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            },
        },
    ],
    webServer: {
        command: 'pnpm next dev',
        port: 3000,
        reuseExistingServer: true,
        timeout: 120 * 1000, // Increase timeout to allow Next.js server to start
    },
});
