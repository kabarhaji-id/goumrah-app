"use client";

import { useQuery } from "@tanstack/react-query";
import { FooterData } from "@/shared/types/FooterTypes";
import { fetchFooterData } from "@/shared/libs/fetchFooterData";
import {fallbackFooterData} from "@/shared/data/fallbackFooterData";

export const useFooterData = () => {
    const { data, isLoading, isError, error, refetch } = useQuery<FooterData>({
        queryKey: ["footerData"],
        queryFn: fetchFooterData, // Correct function reference
        retry: 2,
        refetchOnWindowFocus: false,
        refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    });

    return {
        footerData: data ?? fallbackFooterData, // Ensure data is always available
        isLoading,
        isError,
        error,
        refetch,
    };
};
