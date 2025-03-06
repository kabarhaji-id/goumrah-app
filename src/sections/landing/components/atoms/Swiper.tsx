"use client";

import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "@/sections/landing/components/molecules/card.module.scss";

import { cn } from "@/shared/libs/utils";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CustomSwiperProps {
    maxWidth?: number;
    gap?: number;
    padding?: number;
    className?: string;
    children: React.ReactNode;
    pagination?: boolean;
    autoplay?: boolean;
    bulletVariant?: "primary" | "white" | "white-dot";
    paginationPosition?: "right";
    slidesClass?: string;
    initialSlide?: number;
}

const CustomSwiper = ({
                          children,
                          gap,
                          padding,
                          className,
                          maxWidth,
                          autoplay = false,
                          pagination = false,
                          bulletVariant = "primary",
                          paginationPosition,
                          slidesClass,
                          initialSlide = 0,
                      }: CustomSwiperProps) => {
    let paginationBulletClass;
    let paginationBulletActiveClass;
    let paginationPositionClass;

    if (bulletVariant === "primary") {
        paginationBulletClass = "swiper-pagination-bullet-primary";
        paginationBulletActiveClass = "swiper-pagination-bullet-active-primary";
    } else if (bulletVariant === "white") {
        paginationBulletClass = "swiper-pagination-bullet-white";
        paginationBulletActiveClass = "swiper-pagination-bullet-active-white";
    } else {
        paginationBulletClass = "swiper-pagination-bullet-white";
        paginationBulletActiveClass = "swiper-pagination-bullet-active-white-dot";
    }

    if (paginationPosition === "right") {
        paginationPositionClass = "swiper-pagination-right-side";
    }

    return (
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={gap || gap === 0 ? gap : 16}
            initialSlide={initialSlide}
            pagination={
                pagination
                    ? {
                        clickable: true,
                        bulletClass: paginationBulletClass,
                        bulletActiveClass: paginationBulletActiveClass,
                        ...(paginationPosition && {
                            el: `.${paginationPositionClass}`,
                        }),
                    }
                    : false
            }
            autoplay={
                autoplay
                    ? {
                        delay: 3000,
                        disableOnInteraction: false,
                    }
                    : false
            }
            modules={[Autoplay, Pagination]}
            className={cn(
                `w-full gap-1 ${padding || padding === 0 ? `!px-${padding}` : "!px-4"}`,
                className,
            )}
        >
            {React.Children.toArray(children).map((child, index) => (
                <SwiperSlide
                    key={index}
                    className={cn(
                        `h-fit !w-fit items-center !max-w-[${maxWidth}px]`,
                        slidesClass,
                    )}
                    style={{ marginRight: gap ? gap : "16px" }}
                >
                    {child}
                </SwiperSlide>
            ))}

            {paginationPosition && <div className={cn(paginationPositionClass)} />}
        </Swiper>
    );
};

export { CustomSwiper };
