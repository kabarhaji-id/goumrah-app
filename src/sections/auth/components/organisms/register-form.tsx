"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CheckboxWithLabel from "@/sections/auth/components/molecoles/check-box";
import InputField from "@/sections/auth/components/molecoles/input-field";
import Divider from "@/sections/auth/components/molecoles/devider";
import SocialIcons from "@/sections/auth/components/molecoles/social-login";
import { Button } from "@/sections/landing/components/templates/button";
import LogoDark from "@/public/icons/logo/dark-logo.svg";
import Link from "next/link";
import { z } from "zod";

// ✅ Validation schema with firstName & lastName
const registerSchema = z
    .object({
        firstName: z.string().min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        identifier: z.string().min(3, "Enter a valid email or phone number"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        identifier: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
    });

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, rememberMe: checked }));
    };

    // ✅ Validation function
    const validateForm = () => {
        try {
            registerSchema.parse(formData);
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.error("❌ Validation Error:", err.errors);
                setError(err.errors[0]?.message || "Invalid input");
            } else {
                console.error("❌ Unexpected Error:", err);
                setError("ssss An unexpected error occurred");
            }
            return false;
        }
    };

    // ✅ Registration function
    const registerUser = async () => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    identifier: formData.identifier,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            console.log("🔹 Register API Response:", data);

            if (!response.ok || !data.success) {
                setError(data.message || "Registration failed");
                return;
            }

            console.log("✅ Registration Successful! Redirecting to login...");
            router.push("/auth/login"); // Jangan langsung login otomatis
        } catch (error) {
            console.error("❌ Registration Error:", error);
            setError("An error occurred during registration.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error message

        if (validateForm()) {
            await registerUser();
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center justify-center min-h-[400px]">
            <LogoDark className="w-auto h-auto" />
            <h2 className="text-2xl font-semibold text-center">Welcome to Materialize! 👋</h2>
            <p className="text-center text-gray-500 my-6">Create an account and start your journey</p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    {/* ✅ Added First & Last Name Fields */}
                    <InputField
                        type="text"
                        placeholder="First Name"
                        id="firstName"
                        name="firstName"
                        required
                        onChange={handleInputChange}
                    />
                    <InputField
                        type="text"
                        placeholder="Last Name"
                        id="lastName"
                        name="lastName"
                        required
                        onChange={handleInputChange}
                    />

                    {/* ✅ Existing Fields */}
                    <InputField
                        type="text"
                        placeholder="Email, Phone, or Username"
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
                    <InputField
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
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

                <Button type="submit">Register</Button>

                <div className="text-base text-center text-slate-800 text-opacity-70">
                    <span>Sudah memiliki akun? </span>
                    <Link href="/auth/login" className="text-indigo-500 cursor-pointer">Login disini!</Link>
                </div>

                <Divider text="or" />
                <SocialIcons />
            </form>
        </div>
    );
};

export default RegisterForm;
