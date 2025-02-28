import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/sections/theme/components/ThemeToggle";
import { ThemeProvider } from "next-themes";

describe("ThemeToggle", () => {
    it("should toggle between light and dark themes", () => {
        // ✅ Arrange
        const { getByRole } = render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        const button = getByRole("button");

        // ✅ Act & Assert
        fireEvent.click(button);
        expect(document.documentElement.classList.contains("dark")).toBe(true);

        fireEvent.click(button);
        expect(document.documentElement.classList.contains("light")).toBe(true);
    });
});
