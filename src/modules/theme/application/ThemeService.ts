import { ThemeType } from "@/modules/theme/domain/ThemeModel";
import { ThemeRepository } from "@/modules/theme/infrastructure/ThemeRepository";

export class ThemeService {
    private themeRepository: ThemeRepository;

    constructor(themeRepository: ThemeRepository) {
        this.themeRepository = themeRepository;
    }

    getTheme(): ThemeType {
        return this.themeRepository.getTheme();
    }

    setTheme(theme: ThemeType) {
        this.themeRepository.setTheme(theme);
    }
}
