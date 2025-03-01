"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <NextThemesProvider attribute="class" defaultTheme="light" storageKey="user-theme">
            {children}
        </NextThemesProvider>
    );
}