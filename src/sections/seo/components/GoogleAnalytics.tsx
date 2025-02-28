"use client";
import React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Analytics() {
    return <GoogleAnalytics gaMeasurementId="G-XXXXXXX" trackPageViews />;
}
