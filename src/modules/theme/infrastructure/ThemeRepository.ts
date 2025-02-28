import { ThemeType } from "@/modules/theme/domain/ThemeModel";

export class ThemeRepository {
    private readonly THEME_KEY = "user-theme";

    getTheme(): ThemeType {
        if (typeof window === "undefined") return "light"; // Default untuk SSR
        const theme = localStorage.getItem(this.THEME_KEY);
        return theme === "light" || theme === "dark" ? (theme as ThemeType) : "light";
    }

    setTheme(theme: ThemeType) {
        localStorage.setItem(this.THEME_KEY, theme);
    }
}
