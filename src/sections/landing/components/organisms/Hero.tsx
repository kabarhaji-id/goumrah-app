import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HeroContent } from "@/modules/landing/domain/landingModel";
import { ImageErrorFallback } from "@/sections/landing/components/atoms/imageErrorFallback";
import { motion } from "framer-motion";

export default function Hero({ title, description, tagsLine, buttonLabel, buttonUrl, imageUrl, altText }: HeroContent) {
    const [error, setError] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true); // Track if typing is still happening

    useEffect(() => {
        if (index < title.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + title[index]);
                setIndex(index + 1);
            }, 100); // Typing speed (adjust as needed)

            return () => clearTimeout(timeout);
        } else {
            setIsTyping(false); // Stop cursor when typing is done
        }
    }, [index, title]);

    const handleRetry = () => {
        setError(false);
    };

    const handleClick = () => {
        if (!buttonUrl) return;
        window.open(buttonUrl, "_blank", "noopener,noreferrer");
    };

    const validImageUrl = error || !imageUrl ? "/assets/image/no-image.png" : imageUrl;

    return (
        <main className="container max-w-screen-xl mx-auto px-4 bg-[url(/assets/image/bg-image.png)] bg-no-repeat bg-right bg-contain">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12">
                {/* Image Section */}
                <div className="w-full h-[300px] sm:h-[350px] lg:h-[411px] relative rounded-2xl overflow-hidden flex justify-center">
                    {error ? (
                        <ImageErrorFallback message="Failed to load image. Please check your connection and try again." retry={handleRetry} />
                    ) : (
                        <Image
                            src={validImageUrl}
                            alt={altText || "Default alternative text"}
                            fill
                            priority
                            className="object-cover rounded-2xl transition-transform hover:scale-105 duration-700"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                            quality={90}
                            onError={() => setError(true)}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )}
                </div>

                {/* Text Section */}
                <div className="text-center md:text-left flex flex-col justify-center px-4">
                    <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-600 leading-snug sm:leading-tight lg:leading-[60px] max-w-[90%] sm:max-w-[500px] lg:max-w-[600px] tracking-tight">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block"
                        >
                            {displayedText}
                        </motion.span>
                        {isTyping && (
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }} // Blinking cursor effect
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="text-teal-500"
                            >
                                |
                            </motion.span>
                        )}
                    </h1>
                    <p className="mb-4 text-sm sm:text-base font-semibold leading-relaxed max-w-[532px] text-emerald-950">
                        {description}
                    </p>
                    <p className="mb-6 lg:mb-8 text-xs sm:text-sm italic font-semibold leading-normal text-emerald-950">
                        {tagsLine}
                    </p>

                    <div className="w-full max-w-[532px] px-4 sm:px-0">
                        <button
                            onClick={handleClick}
                            disabled={!buttonUrl}
                            className={`w-full px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold leading-normal sm:leading-7
                            rounded-lg cursor-pointer shadow-[0px_2px_6px_rgba(38,43,67,0.14)]
                            transform transition-all duration-200 ease-in-out
                            hover:scale-[1.02] active:scale-[0.98]
                            ${
                                buttonUrl
                                    ? "bg-teal-600 text-teal-50 hover:bg-teal-700 active:bg-teal-800 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`}
                            aria-label={buttonLabel}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
