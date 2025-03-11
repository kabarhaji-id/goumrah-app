import { ThemeService } from "@/modules/theme/application/ThemeService";
import { ThemeRepository } from "@/modules/theme/infrastructure/ThemeRepository";
import { ThemeType } from "@/modules/theme/domain/ThemeModel";

jest.mock("@/modules/theme/infrastructure/ThemeRepository");

describe("ThemeService", () => {
    let themeService: ThemeService;
    let themeRepositoryMock: jest.Mocked<ThemeRepository>;

    beforeEach(() => {
        themeRepositoryMock = new ThemeRepository() as jest.Mocked<ThemeRepository>;
        themeService = new ThemeService(themeRepositoryMock);
    });

    it("should return the current theme from ThemeRepository", () => {
        // ✅ Arrange
        themeRepositoryMock.getTheme.mockReturnValue("light");

        // ✅ Act
        const theme = themeService.getTheme();

        // ✅ Assert
        expect(theme).toBe("light");
    });

    it("should call setTheme dark in ThemeRepository", () => {
        // ✅ Arrange
        const newTheme: ThemeType = "dark";

        // ✅ Act
        themeService.setTheme(newTheme);

        // ✅ Assert
        expect(themeRepositoryMock.setTheme).toHaveBeenCalledWith("dark");
    });
});
