"use client";

import React, { useState } from "react";
import InputField from "@/sections/auth/components/molecoles/input-field";
import { Button } from "@/sections/landing/components/templates/button";
import LogoDark from "@/public/icons/logo/dark-logo.svg";
import Link from "next/link";
import { z } from "zod";
import { BsChevronLeft } from "react-icons/bs";
import Loading from "@/shared/ui/Loading";

// ✅ Validation schema for email input
const forgetSchema = z.object({
    identifier: z.string().email("Enter a valid email address"),
});

const ForgetForm: React.FC = () => {
    const [formData, setFormData] = useState({ identifier: "" });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ identifier: e.target.value });
    };

    const validateForm = () => {
        try {
            forgetSchema.parse(formData);
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

    const forgetUser = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: formData.identifier }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Request failed");
                return;
            }

            setSuccessMessage("Password reset link sent to your email.");
            setError(null);
        } catch  {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error message

        if (validateForm()) {
            await forgetUser();
        }
    };

    return (
        <>

            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center justify-center min-h-[300px]">
                {loading && <Loading />}
                <LogoDark className="w-auto h-auto" />
                <h2 className="text-2xl font-semibold text-center">Forgot Password?</h2>
                <p className="text-center text-gray-500 my-6">Enter your email to reset your password</p>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                    <InputField
                        type="email"
                        placeholder="Email Address"
                        id="identifier"
                        name="identifier"
                        required
                        onChange={handleInputChange}
                    />

                    <Button type="submit" disabled={loading}>{loading ? "Processing..." : "Reset Password"}</Button>

                    <div className="text-base text-center text-slate-800 text-opacity-70 flex items-center justify-center gap-1">
                        <span>Remembered your password? </span>
                        <Link href="/auth/login" className="text-indigo-500 cursor-pointer flex items-center">
                            <BsChevronLeft className="w-4 h-4 ml-1" /> Login here!
                        </Link>
                    </div>
                </form>
            </div>
        </>

    );
};

export default ForgetForm;
