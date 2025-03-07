"use client";

import React from "react";
import { DefaultSeo, NextSeo } from "next-seo";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";

interface SeoProps {
    metadata: SEOConfig | null; // 🔹 Izinkan metadata bernilai `null`
}

const Seo: React.FC<SeoProps> = ({ metadata }) => {
    if (!metadata) {
        return <DefaultSeo title="Loading..." description="Please wait while the page loads." />;
    }

    return (
        <>
            <DefaultSeo
                title={metadata.title || "Default Title"} // 🔹 Gunakan default jika `null`
                titleTemplate={metadata.titleTemplate || "%s | My Website"}
                defaultTitle={metadata.defaultTitle || "My Website"}
                description={metadata.description || "Default description"}
                canonical={metadata.openGraph?.url}
                openGraph={metadata.openGraph}
                twitter={metadata.twitter}
                additionalMetaTags={metadata.additionalMetaTags}
            />
            <NextSeo
                title={metadata.title || "Default Title"}
                description={metadata.description || "Default description"}
                canonical={metadata.openGraph?.url}
                openGraph={metadata.openGraph}
                twitter={metadata.twitter}
            />
        </>
    );
};

export default Seo;
