import { useEffect, useState } from "react";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import { LandingContent } from "@/modules/landing/domain/landingModel";

export function useLanding() {
    const [data, setData] = useState<LandingContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLandingData() {
            const repository = new LandingRepository();
            try {
                const response = await repository.getLandingContent();
                setData(response);
            } catch (error) {
                console.error("Error fetching landing data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchLandingData();
    }, []);

    return { data, loading };
}
