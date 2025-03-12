"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CheckboxWithLabel from "@/sections/auth/components/molecoles/check-box";
import InputField from "@/sections/auth/components/molecoles/input-field";
import Divider from "@/sections/auth/components/molecoles/devider";
import SocialIcons from "@/sections/auth/components/molecoles/social-login";
import { Button } from "@/sections/landing/components/templates/button";
import LogoDark from "@/public/icons/logo/dark-logo.svg";
import { z } from "zod";
import Link from "next/link";

// ✅ Define Zod schema for validation
const loginSchema = z.object({
    identifier: z.string().min(3, "Enter a valid email or phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
        rememberMe: false,
    });

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            rememberMe: checked,
        }));
    };

    // ✅ Extracted function for validation
    const validateForm = () => {
        try {
            loginSchema.parse(formData);
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0]?.message || "Invalid input");
            } else {
                setError("An unexpected error occurred");
            }
            return false;
        }
    };

    // ✅ Extracted function for authentication
    const authenticateUser = async () => {
        const credentials = {
            redirect: false,
            identifier: formData.identifier,
            password: formData.password,
        };

        console.log("🔹 Sending credentials:", credentials);

        const result = await signIn("credentials", credentials);
        console.log("🟡 API Response:", result);

        if (result?.error) {
            console.error("❌ Login Failed:", result.error);
            setError(
                result.error === "CredentialsSignin"
                    ? "Incorrect email, phone number, or password."
                    : "Login failed. Please try again."
            );

            setFormData({
                identifier: "",
                password: "",
                rememberMe: false,
            });
        } else {
            console.log("✅ Login Successful! Redirecting to dashboard...");
            router.push("/dashboard");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error message

        if (validateForm()) {
            await authenticateUser();
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center justify-center min-h-[400px]">
            <LogoDark className="w-auto h-auto" />
            <h2 className="text-2xl font-semibold text-center">Welcome to Materialize! 👋</h2>
            <p className="text-center text-gray-500 my-6">Please sign in to your account and start the adventure</p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <InputField
                        type="text"
                        placeholder="Email, Phone atau Username"
                        id="identifier"
                        name="identifier"
                        required
                        onChange={handleInputChange}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <CheckboxWithLabel
                        label="Remember Me"
                        id="remember-me"
                        name="remember-me"
                        onChange={handleCheckboxChange}
                    />
                    <button
                        type="button"
                        className="text-base text-indigo-500 cursor-pointer"
                        onClick={() => console.log("Forgot password clicked")}
                    >
                        Forgot Password?
                    </button>
                </div>

                <Button type="submit">Login</Button>

                <div className="text-base text-center text-slate-800 text-opacity-70">
                    <span>Belum memiliki akun? </span>
                    <Link href="/auth/register" className="text-indigo-500 cursor-pointer">Daftar disini.</Link>
                </div>

                <Divider text="or" />

                <SocialIcons />
            </form>
        </div>
    );
};

export default LoginForm;
