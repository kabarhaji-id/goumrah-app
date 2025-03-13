import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getToken, removeToken } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { AuthUser } from "@/modules/auth/domain/users";

/**
 * ✅ Custom Hook: Check user authentication status
 */
export const useAuth = (): AuthUser | null => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();

        if (!token) {
            removeToken();
            router.push("/auth/login");
            return;
        }

        try {
            const decoded = jwtDecode<AuthUser>(token);

            // ✅ Auto logout if token is expired
            if (decoded.exp * 1000 < Date.now()) {
                removeToken();
                router.push("/auth/login");
            } else {
                setUser(decoded);
            }
        } catch {
            removeToken();
            router.push("/auth/login");
        }
    }, [router]); // ✅ Tambahkan router sebagai dependency

    return user;
};
