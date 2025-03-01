import React, {useState} from "react";
import Image from "next/image";
import {HeroContent} from "@/modules/landing/domain/landingModel";
import {ImageErrorFallback} from "@/sections/landing/components/atoms/imageErrorFallback";


export default function Hero({title, description, tagsLine, buttonLabel, imageUrl, altText}: HeroContent) {
    const [error, setError] = useState(false);

    const handleRetry = () => {
        setError(false);
    };

    const validImageUrl = error || !imageUrl ? "/assets/image/no-image.png" : imageUrl;


    return (
        <>
            <main className="container max-w-screen-xl mx-auto px-4">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12">
                    {/* Image Section */}
                    <div className="w-full h-[300px] sm:h-[350px] lg:h-[411px] relative rounded-2xl overflow-hidden flex justify-center">
                        {error ? (
                            <ImageErrorFallback
                                message="Failed to load image. Please check your connection and try again."
                                retry={handleRetry}
                            />
                        ) : (
                            <Image
                                src={validImageUrl} // ✅ Always a valid string
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
                            {title}
                        </h1>
                        <p className="mb-4 text-sm sm:text-base font-semibold leading-relaxed max-w-[532px] text-emerald-950">
                            {description}
                        </p>
                        <p className="mb-6 lg:mb-8 text-xs sm:text-sm italic font-semibold leading-normal text-emerald-950">
                            {tagsLine}
                        </p>

                        <div className="w-full max-w-[532px] px-4 sm:px-0">
                            <button
                                className="w-full px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold leading-normal sm:leading-7
                    text-teal-50 bg-teal-600 rounded-lg cursor-pointer
                    shadow-[0px_2px_6px_rgba(38,43,67,0.14)]
                    hover:bg-teal-700 active:bg-teal-800
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                    transform transition-all duration-200 ease-in-out
                    hover:scale-[1.02] active:scale-[0.98]"
                                aria-label={buttonLabel}
                            >
                                {buttonLabel}
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>

    );
}
