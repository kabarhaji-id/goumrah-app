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
import { z } from "zod"; // ✅ Import Zod for validation

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error message

        try {
            // ✅ Validasi input menggunakan Zod
            loginSchema.parse(formData);
            console.log("✅ Validation Passed:", formData);

            const credentials = {
                redirect: false,
                identifier: formData.identifier, // 🔥 Kirim identifier sesuai backend
                password: formData.password,
            };

            console.log("🔹 Sending credentials:", credentials);

            const result = await signIn("credentials", credentials);
            console.log("🟡 API Response:", result);

            if (result?.error) {
                console.error("❌ Login Failed:", result.error);
                setError(result.error);
            } else {
                console.log("✅ Login Successful! Redirecting to dashboard...");
                router.push("/dashboard"); // Redirect user
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.error("❌ Validation Error:", err.errors);
                setError(err.errors[0]?.message || "Invalid input");
            } else {
                console.error("❌ Unexpected Error:", err);
                setError("An unexpected error occurred");
            }
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
                        type="text" // ✅ Accepts both email & phone
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
                    <span>New on our platform? </span>
                    <button
                        type="button"
                        className="text-indigo-500 cursor-pointer"
                        onClick={() => router.push("/auth/register")}
                    >
                        Create an account
                    </button>
                </div>

                <Divider text="or" />

                <SocialIcons />
            </form>
        </div>
    );
};

export default LoginForm;
