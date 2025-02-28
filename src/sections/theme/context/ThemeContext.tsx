"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeType } from "@/modules/theme/domain/ThemeModel";
import { ThemeService } from "@/modules/theme/application/ThemeService";
import { ThemeRepository } from "@/modules/theme/infrastructure/ThemeRepository";

const themeService = new ThemeService(new ThemeRepository());

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeType>("system");

    useEffect(() => {
        const currentTheme = themeService.getTheme();
        console.log("Loaded theme from service:", currentTheme);

        setThemeState(currentTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(currentTheme);
    }, []);

    const setTheme = (newTheme: ThemeType) => {
        console.log("Setting new theme:", newTheme);
        themeService.setTheme(newTheme);
        setThemeState(newTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useThemeContext must be used within ThemeProvider");
    return context;
}
