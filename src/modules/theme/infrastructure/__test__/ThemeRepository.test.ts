import { ThemeRepository } from "@/modules/theme/infrastructure/ThemeRepository";
import { ThemeType } from "@/modules/theme/domain/ThemeModel";

describe("ThemeRepository", () => {
    let themeRepository: ThemeRepository;

    beforeEach(() => {
        themeRepository = new ThemeRepository();
        Storage.prototype.getItem = jest.fn();
        Storage.prototype.setItem = jest.fn();
    });

    it("should return the stored theme from localStorage", () => {
        // ✅ Arrange
        (localStorage.getItem as jest.Mock).mockReturnValue("dark");

        // ✅ Act
        const theme = themeRepository.getTheme();

        // ✅ Assert
        expect(theme).toBe("dark");
    });

    it("should return 'system' when no theme is stored", () => {
        // ✅ Arrange
        (localStorage.getItem as jest.Mock).mockReturnValue(null);

        // ✅ Act
        const theme = themeRepository.getTheme();

        // ✅ Assert
        expect(theme).toBe("system");
    });

    it("should store the theme in localStorage", () => {
        // ✅ Arrange
        const newTheme: ThemeType = "light";

        // ✅ Act
        themeRepository.setTheme(newTheme);

        // ✅ Assert
        expect(localStorage.setItem).toHaveBeenCalledWith("user-theme", "light");
    });
});
