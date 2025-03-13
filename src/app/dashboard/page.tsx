"use client";

import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const user = useAuth();
    const router = useRouter();

    if (!user) return <p>Loading...</p>;

    if (user?.role !== "ADMINISTRATOR") {
        router.push("/forbidden");
        return null;
    }

    return (
        <div>
            <h1>Welcome to Dashboard, {user.firstName}</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default Dashboard;
