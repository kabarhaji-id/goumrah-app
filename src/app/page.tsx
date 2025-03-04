"use client";

import React from "react";
import { useLanding } from "@/sections/landing/hooks/useLanding";
import Navbar from "@/sections/landing/components/organisms/Navbar";
import Hero from "@/sections/landing/components/organisms/Hero";
import WhyChooseUs from "@/sections/landing/components/organisms/WhyChooseUs";
import {SinglePackages} from "@/sections/landing/components/organisms/SinglePackages";

export default function Home() {
    const { data, loading } = useLanding();

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Error loading data</p>;

    return (
        <>
            <Navbar />
            <Hero {...data.heroContent} />
            <SinglePackages {...data.singlePackage} />
            <WhyChooseUs {...data.featuresContent} />
        </>
    );
}
