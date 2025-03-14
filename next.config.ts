import type { NextConfig } from "next";
import dotenv from 'dotenv';

dotenv.config();

const nextConfig: NextConfig = {
    env: {
        JWT_SECRET: process.env.JWT_SECRET,
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Credentials",
                        value: "true",
                    },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*", // Atau ganti dengan domain frontend jika production
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
    trailingSlash: false,
    basePath: "",
    reactStrictMode: true, // Enforce React best practices
    images: {
        loader : "default",
        minimumCacheTTL: 60,
        localPatterns: [
            {
                pathname: '/assets/**',
                search: '',
            },
        ],
        remotePatterns: [
            {
                protocol: "https", // Protocol (http or https)
                hostname: "goumrah.id", // Your image domain
                pathname: "/assets/**", // Optional path to restrict image source
            }
        ],
        formats: ["image/avif", "image/webp"], // Enable modern image formats for better performance
        deviceSizes: [320, 420, 768, 1024, 1200], // Define breakpoints for responsive images
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Define sizes for static images
    },
    assetPrefix: "/", // Ensure static assets are served correctly from the root path
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        forceSwcTransforms: true, // ✅ Use SWC instead of Babel for better performance
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
};

export default nextConfig;
