"use client";

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

// Ambil Pixel ID dari .env
const META_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "";

const options = {
    autoConfig: true,
    debug: false, // Set ke `true` jika ingin debugging
};

export default function FacebookPixel() {
    useEffect(() => {
        if (typeof window !== "undefined" && META_PIXEL_ID) {
            ReactPixel.init(META_PIXEL_ID, undefined, options);
            ReactPixel.pageView(); // Track page view saat pertama kali dimuat
        }
    }, []);

    return null; // Tidak perlu render elemen apapun
}
