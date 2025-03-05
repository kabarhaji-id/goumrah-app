"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LandingContent } from "@/modules/landing/domain/landingModel";
import {dummyLandingData} from "@/modules/landing/infrastructure/landingDumyData";

interface LandingContextType {
    data: LandingContent | null;
    loading: boolean;
}

const LandingContext = createContext<LandingContextType | undefined>(undefined);

export function LandingProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<LandingContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLandingData() {
            try {
                const response = await fetch("/api/landing");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result: { data: LandingContent } = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Error fetching landing data:", error);

                // Gunakan dummy data jika fetch gagal
                setData(dummyLandingData);
            } finally {
                setLoading(false);
            }
        }

        fetchLandingData();
    }, []);

    return (
        <LandingContext.Provider value={{ data, loading }}>
            {children}
        </LandingContext.Provider>
    );
}


export function useLandingContext() {
    const context = useContext(LandingContext);
    if (!context) {
        throw new Error("useLandingContext must be used within a LandingProvider");
    }
    return context;
}
