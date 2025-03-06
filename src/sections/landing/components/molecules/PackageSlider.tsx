import { useState, useEffect } from "react";
import { PackageItem } from "@/modules/landing/domain/landingModel";
import { PackageCard } from "@/sections/landing/components/molecules/package-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface PackageSliderProps {
    title: string;
    subtitle?: string;
    packages: PackageItem[];
}

export default function PackageSlider({ title, subtitle = "", packages }: PackageSliderProps) {
    // State to track screen width
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Determine when Swiper should be active
    const isSwiperActive = isMobile ? packages.length > 1 : packages.length > 3;

    return (
        <div className="mb-12">
            {/* Header Section */}
            <header className="mb-6 text-center">
                <h2 className="text-base font-semibold text-emerald-950">{title}</h2>
                <h1 className="text-4xl font-extrabold text-teal-600 max-sm:text-3xl">{subtitle}</h1>
            </header>

            {/* Swiper for sliding effect */}
            {isSwiperActive ? (
                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={isMobile ? 1 : 3}
                        spaceBetween={16}
                        loop={packages.length > 3}
                        navigation={!isMobile && packages.length > 3}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="w-full !px-6"
                    >
                        {packages.map((pkg) => (
                            <SwiperSlide key={pkg.id} className="h-fit w-full max-w-[95%] pb-2">
                                <PackageCard {...pkg} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Expanding Dot Pagination */}
                    <div className="flex justify-center mt-4 space-x-2">
                        {packages.map((_, index) => (
                            <div
                                key={index}
                                className={`h-3 transition-all duration-300 rounded-full ${
                                    index === activeIndex ? "bg-teal-600 w-6" : "bg-gray-300 w-3"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                // Static layout when Swiper is inactive
                <div
                    className={`flex gap-6 justify-center items-stretch ${
                        packages.length === 3 ? "max-w-7xl mx-auto w-full" : "flex-wrap"
                    }`}
                >
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`h-fit ${
                                packages.length === 3
                                    ? "w-1/3 flex justify-center"
                                    : "max-w-[30%] min-w-[250px]"
                            }`}
                        >
                            <PackageCard {...pkg} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
