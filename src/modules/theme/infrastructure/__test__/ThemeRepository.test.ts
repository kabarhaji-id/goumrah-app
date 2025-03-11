
import { ThemeType } from "@/modules/theme/domain/ThemeModel";
import {ThemeRepository} from "@/modules/theme/infrastructure/ThemeRepository";

describe("ThemeRepository", () => {
    let themeRepository: ThemeRepository;

    beforeEach(() => {
        themeRepository = new ThemeRepository();
        localStorage.clear(); // Membersihkan localStorage sebelum setiap test
    });

    describe("getTheme", () => {
        it("should return 'light' as default when no theme is set (positive case)", () => {
            // Arrange (Setup is done in beforeEach)

            // Act
            const theme = themeRepository.getTheme();

            // Assert
            expect(theme).toBe("light");
        });

        it("should return the stored theme when it is set to 'dark' (positive case)", () => {
            // Arrange
            localStorage.setItem("user-theme", "dark");

            // Act
            const theme = themeRepository.getTheme();

            // Assert
            expect(theme).toBe("dark");
        });

        it("should return 'light' when localStorage contains an invalid value (negative case)", () => {
            // Arrange
            localStorage.setItem("user-theme", "invalid-theme");

            // Act
            const theme = themeRepository.getTheme();

            // Assert
            expect(theme).toBe("light");
        });
    });

    describe("setTheme", () => {
        it("should correctly set the theme to 'dark' (positive case)", () => {
            // Arrange
            const theme: ThemeType = "dark";

            // Act
            themeRepository.setTheme(theme);

            // Assert
            expect(localStorage.getItem("user-theme")).toBe("dark");
        });

        it("should correctly set the theme to 'light' (positive case)", () => {
            // Arrange
            const theme: ThemeType = "light";

            // Act
            themeRepository.setTheme(theme);

            // Assert
            expect(localStorage.getItem("user-theme")).toBe("light");
        });
    });
});