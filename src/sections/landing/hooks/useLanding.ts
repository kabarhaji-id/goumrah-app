import { useState, useEffect } from "react";
import {LandingContent} from "@/modules/landing/domain/landingModel";
import {dummyLandingData} from "@/modules/landing/infrastructure/landingDumyData";

export function useLanding() {
    const [data, setData] = useState<LandingContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/landing", {cache: "no-store"});
                if (!response.ok) {

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result: { data: LandingContent } = await response.json();
                setData(result.data);
            } catch (err) {
                let errorMessage = "Unknown error occurred";

                if (err instanceof Error) {
                    errorMessage = err.message;
                }

                console.log(`Error fetching landing data: ${errorMessage}` );
                setError(errorMessage);
                setData(dummyLandingData)
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { data, loading, error };
}
