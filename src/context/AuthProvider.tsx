"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { Users } from "@/modules/auth/domain/users";
import {
    getUserFromCookies, removeToken, removeUserFromCookies,
    saveToken,
} from "@/modules/auth/infrastructure/utils/sessionUtils";

interface AuthContextType {
    user: Users | null;
    login: (token: string) => void;
    logout: () => void;
    checkAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Users | null>(null);

    console.log("🔥 [AuthProvider] Current User:", user);

    const checkAuth = useCallback(() => {
        const userInCookies = getUserFromCookies();

        console.log("🔥 [AuthProvider] Current User In Cookie:", userInCookies);
        if (userInCookies) {
            console.log("✅ [AuthProvider] Authenticated user:", userInCookies);
            setUser(userInCookies);
        } else {
            console.warn("❌ [AuthProvider] No user found. Logging out...");
            logout();
        }
    }, []);

    const login = (token: string) => {
        saveToken(token);
        checkAuth();
    };

    const logout = () => {
        removeToken();
        removeUserFromCookies();
        setUser(null);
    };

    useEffect(() => {
        checkAuth(); // ✅ Cek user saat page reload
    }, [checkAuth]);

    return (
        <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
