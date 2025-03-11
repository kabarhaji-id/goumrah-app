import { z } from "zod";

// Define a Zod schema for credentials validation
export const loginSchema = z.object({
    identifier: z.string().min(1, "Email or phone is required").trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript type from schema
export type LoginSchema = z.infer<typeof loginSchema>;
