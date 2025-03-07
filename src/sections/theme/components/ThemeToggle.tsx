"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import {LuMoon, LuSun} from "react-icons/lu";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        console.log("Resolved Theme:", resolvedTheme);
    }, [resolvedTheme]);

    return (
        <button
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            {resolvedTheme === "dark" ? <LuSun className="w-6 h-6" /> : <LuMoon className="w-6 h-6" />}
        </button>
    );
}
