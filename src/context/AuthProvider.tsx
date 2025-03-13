"use client";

import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define User Type
interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    role: string;
}

// Create Auth Context
export const AuthContext = createContext<{
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
});

// Auth Provider
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Load user and token from localStorage on page load
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser) as User);
        }
    }, []);

    // Login function
    const login = (userData: User, authToken: string) => {
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setToken(authToken);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
