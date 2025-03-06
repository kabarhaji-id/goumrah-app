import { useState, useEffect } from "react";

type ScreenType = "mobile" | "tablet" | "desktop";

export const useScreenType = (): ScreenType => {
    const [screenType, setScreenType] = useState<ScreenType>("desktop");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenType(
                width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop"
            );
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenType;
};
