export interface AuthCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    userId: string;
    token: string;
    expiresIn: number;
}