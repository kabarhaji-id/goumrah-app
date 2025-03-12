import { Role } from "./role";
import {User} from "next-auth";

export interface Users {
    id: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    phone: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthUser extends User {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | null;
    image?: string | null;
    role: Role;
}
