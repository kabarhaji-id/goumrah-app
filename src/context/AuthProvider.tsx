"use client";

import { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthUser } from "@/modules/auth/domain/users";

interface AuthContextType {
    user: AuthUser | null;
    login: (data: LoginCredentials) => Promise<void>;
    logout: () => void;
}

interface LoginCredentials {
    identifier: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const login = async (data: LoginCredentials) => {
        const response = await axios.post("/api/auth/login", data);
        const { token, user } = response.data;

        Cookies.set("token", token, { expires: 7 });
        setUser(user);
    };

    const logout = useCallback(async () => {
        Cookies.remove("token");
        setUser(null);
        try {
            await axios.post("/api/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, []);

    const checkAuth = useCallback(async () => {
        const token = Cookies.get("token");
        if (!token) return;

        try {
            const response = await axios.get("/api/auth/me");
            setUser(response.data.user);
        } catch {
            await logout(); // Handle expired token
        }
    }, [logout]);

    useEffect(() => {
        void checkAuth();
    }, [checkAuth]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
