import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    trailingSlash: true,
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
        forceSwcTransforms: true, // ✅ Forces SWC even with Babel
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (rule: { test: { test: (arg0: string) => any } }) =>
                rule.test?.test?.(".svg"),
        );

        // Reapply the existing rule for handling svg imports
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/],
                }, // exclude *.svg?url
                use: ["@svgr/webpack"],
            },
        );

        // Modify the file loader rule to ignore *.svg
        fileLoaderRule.exclude = /\.svg$/i;

        // ✅ Return the modified config
        return config;
    },
};

export default nextConfig;
