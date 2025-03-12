"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {Container} from "@/shared/ui/layout/components/container";
import Hero from "@/sections/landing/components/organisms/Hero";
import {SinglePackages} from "@/sections/landing/components/organisms/SinglePackages";
import SliderPackages from "@/sections/landing/components/organisms/SliderPackages";
import WhyChooseUs from "@/sections/landing/components/organisms/WhyChooseUs";
import {PageWrapper} from "@/shared/ui/layout/page-wrapper";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log("🔹 Session Data:", session);
    console.log("🔹 Session Status:", status);

    useEffect(() => {
        if (status === "unauthenticated") {
            console.warn("❌ User not authenticated, redirecting to login...");
            router.push("/auth/login");
        }
    }, [status, router]);

    if (status === "loading") return <p>Loading...</p>;

    return (

        <PageWrapper>
            <Container className=" h-full text-center text-2xl">
                <h1>Welcome to the Dashboard</h1>
                <p>User: {session?.user?.email || session?.user?.phone || "No email/phone found"}</p>
            </Container>
        </PageWrapper>
    );
};

export default Dashboard;
