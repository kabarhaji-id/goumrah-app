// src/shared/config/routeConfig.ts

import {Role} from "@/modules/auth/domain/role";

export const protectedRoutes = [
    "/dashboard",
    "/bookings",
    "/support",
    "/partners",
    "/financing",
];

export const excludedRoutes = [
    "/api/auth/login",
];

export const allowedRoles: Role[] = [
    Role.ADMINISTRATOR,
    Role.CUSTOMER,
    Role.PARTNER,
    Role.CUSTOMER_SUPPORT,
    Role.FINANCE
];
