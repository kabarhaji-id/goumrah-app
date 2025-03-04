import { Role } from "./role";

export interface Users {
    id: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
