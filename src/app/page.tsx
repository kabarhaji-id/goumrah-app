"use client";

import React from "react";
import { useLanding } from "@/sections/landing/hooks/useLanding";
import Navbar from "@/sections/landing/components/Navbar";
import Hero from "@/sections/landing/components/Hero";

export default function Home() {
    const { data, loading } = useLanding();

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Error loading data</p>;

    return (
        <>
            <Navbar />
            <Hero {...data.heroContent} />
        </>
    );
}
