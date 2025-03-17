"use client";

import { PageWrapper } from "@/shared/ui/layout/page-wrapper";
import { Container } from "@/shared/ui/layout/components/container";
import {useAuth} from "@/shared/hooks/useAuth";
export default function Dashboard() {
    const { user } = useAuth();

    console.log("🎯 [Dashboard] User:", user);

    return (
        <PageWrapper>
            <Container className="h-full text-center text-2xl">
                <h1>Welcome to Dashboard, {user?.firstName || "Guest"}</h1>
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>

                <button className="mt-5 p-2 bg-red-500 text-white rounded-md">
                    Logout
                </button>
            </Container>
        </PageWrapper>
    );
}
