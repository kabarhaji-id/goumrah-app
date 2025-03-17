"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CheckboxWithLabel from "@/sections/auth/components/molecoles/check-box";
import InputField from "@/sections/auth/components/molecoles/input-field";
import Divider from "@/sections/auth/components/molecoles/devider";
import SocialIcons from "@/sections/auth/components/molecoles/social-login";
import { Button } from "@/sections/landing/components/templates/button";
import LogoDark from "@/public/icons/logo/dark-logo.svg";
import { z } from "zod";
import Link from "next/link";
import { saveToken } from "@/modules/auth/infrastructure/utils/sessionUtils";

const loginSchema = z.object({
    identifier: z.string().min(3, "Enter a valid email or phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

interface LoginFormProps {
    onLoading?: (loading: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoading }) => {
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

        if (error) {
            setError(null);
        }
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            rememberMe: checked,
        }));
        if (error) {
            setError(null);
        }
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        console.log("Form submission started");

        if (!validateForm()) {
            console.log("Form validation failed");
            return;
        }

        try {
            console.log("Sending login request...");

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identifier: formData.identifier,
                    password: formData.password,
                }),
            });

            const jsonResponse = await res.json();

            if (!res.ok) {
                if (jsonResponse.error) {
                    throw new Error(jsonResponse.error);
                }
            }

            // ✅ Destructure properly from data object
            const { user, token } = jsonResponse.data;

            console.log("User Data:", user);
            console.log("Token:", token); // 🔥 Fixed here

            saveToken(token); // ✅ Save token to cookies
            localStorage.setItem("user", JSON.stringify(user)); // ✅ Store user data locally
            router.push("/");

        } catch (error) {
            console.error("An error occurred during login:", error);
            setError("Incorrect email or password.");
        } finally {
            console.log("Form submission finished");
            if (onLoading) onLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center justify-center min-h-[400px]">
            <LogoDark className="w-auto h-auto" />
            <h2 className="text-2xl font-semibold text-center">Welcome to Materialize! 👋</h2>
            <p className="text-center text-gray-500 my-6">Please sign in to your account and start the adventure</p>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

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
                    <Link href="/auth/register" className="text-indigo-500 cursor-pointer">
                        Daftar disini.
                    </Link>
                </div>

                <Divider text="atau" />

                <SocialIcons />
            </form>
        </div>
    );
};

export default LoginForm;
