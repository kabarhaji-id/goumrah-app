const fs = require("fs");
const path = require("path");

const BASE_UNIT_TEST_DIR = "__tests__"; // Untuk logic (utilities, hooks)
const BASE_E2E_TEST_DIR = "e2e"; // Untuk UI testing
const LOGIC_DIRS = ["src/shared/utils", "src/shared/hooks"]; // Tempat penyimpanan logic
const COMPONENT_DIRS = ["src/shared/ui", "src/modules", "src/sections"];
const PAGE_DIR = "src/app";

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const createTestFile = (filePath, content) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`✅ Created: ${filePath}`);
    } else {
        console.log(`⚠️ Skipped: ${filePath}`);
    }
};

// ✅ Generate Unit Tests for Logic (Utils & Hooks)
const generateLogicTests = () => {
    LOGIC_DIRS.forEach((dir) => {
        if (fs.existsSync(dir)) {
            const testDir = path.join(dir, BASE_UNIT_TEST_DIR);
            ensureDir(testDir);

            const logicFiles = fs.readdirSync(dir).filter((file) => file.endsWith(".ts"));

            logicFiles.forEach((file) => {
                const logicName = file.replace(".ts", "");
                const testContent = `import { ${logicName} } from '../${logicName}';

describe('${logicName}', () => {
  test('should work correctly', () => {
    // TODO: Tambahkan pengujian logika
  });
});
`;
                createTestFile(path.join(testDir, `${logicName}.test.ts`), testContent);
            });
        }
    });
};

// ✅ Generate UI Tests for Components (E2E)
const generateComponentE2ETests = () => {
    const componentTestDir = path.join(BASE_E2E_TEST_DIR, "components");
    ensureDir(componentTestDir);

    COMPONENT_DIRS.forEach((dir) => {
        if (fs.existsSync(dir)) {
            const components = fs.readdirSync(dir, { withFileTypes: true });

            components.forEach((item) => {
                if (item.isFile() && item.name.endsWith(".tsx")) {
                    const componentName = item.name.replace(".tsx", "");
                    const testContent = `import { test, expect } from '@playwright/test';

test.describe('${componentName} Component', () => {
  test('should render correctly', async ({ page }) => {
    await page.goto('/'); // Sesuaikan dengan halaman di mana komponen ini ditampilkan
    expect(await page.locator('[data-testid="${componentName.toLowerCase()}"]').isVisible()).toBeTruthy();
  });
});
`;
                    createTestFile(path.join(componentTestDir, `${componentName}.spec.ts`), testContent);
                }
            });
        }
    });
};

// ✅ Generate UI Tests for Pages (E2E)
const generatePageE2ETests = () => {
    const pageTestDir = path.join(BASE_E2E_TEST_DIR, "pages");
    ensureDir(pageTestDir);

    if (fs.existsSync(PAGE_DIR)) {
        const pages = fs.readdirSync(PAGE_DIR).filter((file) => file.endsWith(".tsx") && file !== "layout.tsx");

        pages.forEach((page) => {
            const pageName = page.replace(".tsx", "");
            const testContent = `import { test, expect } from '@playwright/test';

test.describe('Page ${pageName}', () => {
  test('should load correctly', async ({ page }) => {
    await page.goto('/${pageName}');
    expect(await page.title()).toBe('${pageName} Page');
  });
});
`;
            createTestFile(path.join(pageTestDir, `${pageName}.spec.ts`), testContent);
        });
    }
};

// ✅ Jalankan semua generator
generateLogicTests();
generateComponentE2ETests();
generatePageE2ETests();

console.log("✅ Test generation complete!");
