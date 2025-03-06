"use client";

import React, {useEffect, useState} from "react";
import { useLanding } from "@/sections/landing/hooks/useLanding";
import Hero from "@/sections/landing/components/organisms/Hero";
import WhyChooseUs from "@/sections/landing/components/organisms/WhyChooseUs";
import { SinglePackages } from "@/sections/landing/components/organisms/SinglePackages";
import SliderPackages from "@/sections/landing/components/organisms/SliderPackages";
import Loading from "@/shared/ui/Loading";
import {PageWrapper} from "@/shared/ui/layout/page-wrapper";
import {Container} from "@/shared/ui/layout/components/container";

export default function Home() {
    const { data, loading } = useLanding();
    const [isLoading, setIsLoading] = useState(true);

    // Ensure loading animation lasts at least 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (loading || isLoading) return <Loading />;
    if (!data) return <p className="text-center text-red-500">Error loading data</p>;


    return (
        <PageWrapper>
            <Container className=" h-full text-center text-2xl">
                <Hero {...data.heroContent} />
                <SinglePackages {...data.singlePackage} />
                <SliderPackages
                    silver={data.packagesContent.silver}
                    gold={data.packagesContent.gold}
                    platinum={data.packagesContent.platinum}
                />
                <WhyChooseUs {...data.featuresContent} />
            </Container>
        </PageWrapper>
    );
}
