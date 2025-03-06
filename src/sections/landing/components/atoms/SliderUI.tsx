import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ReactNode } from "react";

interface KeenSliderProps {
    children: ReactNode;
    itemCount: number; // Pass total number of items
}

export default function SliderUI({ children, itemCount }: KeenSliderProps) {
    const shouldEnableSlider = itemCount >= 4; // Disable slider if fewer than 4 items

    const [sliderRef] = useKeenSlider(
        shouldEnableSlider
            ? {
                loop: true,
                mode: "free",
                slides: {
                    perView: 1.2,
                    spacing: 16,
                },
                breakpoints: {
                    "(min-width: 640px)": {
                        slides: { perView: 2.2, spacing: 16 },
                    },
                    "(min-width: 1024px)": {
                        slides: { perView: 3.2, spacing: 20 },
                    },
                },
            }
            : {} // Empty object disables slider
    );

    return (
        <div ref={shouldEnableSlider ? sliderRef : null} className="keen-slider">
            {children}
        </div>
    );
}
