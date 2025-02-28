import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, useThemeContext } from "@/sections/theme/context/ThemeContext";
import { ThemeService } from "@/modules/theme/application/ThemeService";
import { ThemeType } from "@/modules/theme/domain/ThemeModel";
import { ThemeRepository } from "@/modules/theme/infrastructure/ThemeRepository";

jest.mock("@/modules/theme/application/ThemeService");

const MockChild = () => {
    const { theme } = useThemeContext();
    return <div data-testid="theme">{theme}</div>;
};

describe("ThemeContext", () => {
    let themeServiceMock: jest.Mocked<ThemeService>;

    beforeEach(() => {
        themeServiceMock = new ThemeService(new ThemeRepository()) as jest.Mocked<ThemeService>;
        themeServiceMock.getTheme.mockReturnValue("dark");
    });

    it("should provide the default theme value", () => {
        // ✅ Arrange & Act
        render(
            <ThemeProvider>
                <MockChild />
            </ThemeProvider>
        );

        // ✅ Assert
        expect(screen.getByTestId("theme").textContent).toBe("dark");
    });

    it("should update the theme when setTheme is called", () => {
        // ✅ Arrange
        const { getByTestId } = render(
            <ThemeProvider>
                <MockChild />
            </ThemeProvider>
        );

        // ✅ Act
        themeServiceMock.setTheme("light");

        // ✅ Assert
        expect(getByTestId("theme").textContent).toBe("light");
    });
});
