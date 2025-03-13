"use client";

import React, { useState } from "react";
import LoginForm from "@/sections/auth/components/organisms/login-form";
import Image from "next/image";
import Loading from "@/shared/ui/Loading";

/**
 * LoginCard component that contains the logo and login form
 */
const LoginCard: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const lightImg = '/assets/image/auth/auth-v1-mask-1-light.png';

    const handleLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    };

    return (
        <div className="relative h-[calc(100vh-62px)] flex items-center justify-center p-6 overflow-y-scroll no-scrollbar lg:scrollbar">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <Loading />
                </div>
            )}
            <LoginForm onLoading={handleLoading} />

            <Image
                src={lightImg}
                alt="Illustration"
                width={2880}
                height={528}
                className="absolute bottom-0 right-0 z-[-1] is-full max-md:hidden"
            />
        </div>
    );
};

export default LoginCard;
