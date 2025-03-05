import { FeaturesContent } from "@/modules/landing/domain/landingModel";
import { FeatureCard } from "@/sections/landing/components/molecules/feature-card";
import { Button } from "@/sections/landing/components/templates/button";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";

export default function WhyChooseUs({ header, benefits, footerTitle, buttonAbout, buttonPackage }: FeaturesContent) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 1.5, // Ensure card size remains consistent
            spacing: 10,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 3, spacing: 16 },
            },
        },
    });

    return (
        <section className="w-full bg-[#002626] text-white text-center py-12 sm:py-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-400">
                    {header?.title || "Default Title"}
                </h2>
                <p className="italic text-gray-400 mt-2 text-sm sm:text-base">
                    {header?.subtitle || "Default Subtitle"}
                </p>

                {/* Features Grid - Slider on Mobile, Grid on Desktop */}
                {isMobile ? (
                    <div ref={sliderRef} className="keen-slider mt-10">
                        {benefits?.map((benefit) => (
                            <div key={benefit.id} className="keen-slider__slide flex justify-center">
                                <FeatureCard {...benefit} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                            {benefits?.slice(0, 3).map((benefit) => (
                                <FeatureCard key={benefit.id} {...benefit} />
                            ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
                             style={{ marginInlineStart: "208px", marginInlineEnd: "208px" }}>
                            {benefits?.slice(3, 5).map((benefit) => (
                                <FeatureCard key={benefit.id} {...benefit} />
                            ))}
                        </div>
                    </>
                )}

                {/* CTA Title */}
                <h3 className="mt-10 text-lg sm:text-xl font-semibold">{footerTitle}</h3>

                {/* CTA Buttons (Stacked on mobile, side-by-side on larger screens) */}
                <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="outline">{buttonAbout}</Button>
                    <Button variant="primary">{buttonPackage}</Button>
                </div>
            </div>
        </section>
    );
}
