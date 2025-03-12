"use client";

import React from "react";
import RegisterForm from "@/sections/auth/components/organisms/register-form";
import Image from "next/image";

/**
 * LoginCard component that contains the logo and login form
 */
const RegisterCard: React.FC = () => {
    const lightImg = '/assets/image/auth/auth-v1-mask-2-light.png'
    return (
        <div className="relative h-[calc(100vh-62px)] flex items-center justify-center p-6 overflow-y-scroll no-scrollbar lg:scrollbar">

            <RegisterForm />

            <Image
                src={lightImg}
                alt="Illustration"
                width={2880}
                height={528}
                className='absolute bottom-0 right-0  z-[-1] is-full max-md:hidden'/>


        </div>
    );
};

export default RegisterCard;
