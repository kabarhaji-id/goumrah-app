"use client";

import React from "react";
import { useLanding } from "@/sections/landing/hooks/useLanding";
import Hero from "@/sections/landing/components/organisms/Hero";
import WhyChooseUs from "@/sections/landing/components/organisms/WhyChooseUs";
import {SinglePackages} from "@/sections/landing/components/organisms/SinglePackages";
import SliderPackages from "@/sections/landing/components/organisms/SliderPackages";

export default function Home() {
    const { data, loading } = useLanding();

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Error loading data</p>;

    return (
        <>
            <Hero {...data.heroContent} />
            <SinglePackages {...data.singlePackage} />
            <SliderPackages silver={data.packagesContent.silver} gold={data.packagesContent.gold} platinum={data.packagesContent.platinum} />
            <WhyChooseUs {...data.featuresContent} />
        </>
    );
}
