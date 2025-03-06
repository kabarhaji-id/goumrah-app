"use client"
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GoogleAnalytics, event } from "nextjs-google-analytics";
import CookieConsent from "react-cookie-consent";
import { v4 as uuidv4 } from "uuid";
import { getSectionData } from "@/shared/libs/utils";
import {EventData} from "@/modules/seo/domain/AnalyticTypes";
import {useScreenType} from "@/shared/libs/useScreenTypes";

declare global {
    interface Window {
        dataLayer: EventData[];
    }
}

export default function Analytics({ eventData }: { eventData?: Partial<EventData> }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [currentLocation, setCurrentLocation] = useState<string | null>(null);
    const screenType = useScreenType(); // ✅ Gunakan hook untuk cek screen type

    useEffect(() => {
        if (!pathname) return;
        const query = searchParams.toString();
        const fullPath = query ? `${pathname}?${query}` : pathname;

        event("page_view", {
            page_path: fullPath,
            page_title: document.title,
            page_location: window.location.href,
            page_referrer: document.referrer || "direct",
            language: navigator.language || "en",
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
            country: "id",
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation(`${latitude},${longitude}`);
                },
                () => {
                    setCurrentLocation("Permission Denied");
                }
            );
        } else {
            setCurrentLocation("Geolocation not supported");
        }
    }, [pathname, searchParams]);

    useEffect(() => {
        if (!pathname || currentLocation === null) return;

        const { sectionId, sectionName } = getSectionData(pathname);
        const activeFilter = searchParams.get("filter") || null;

        const dynamicEventData: EventData = {
            event_name: eventData?.event_name || "page_view",
            country: eventData?.country || "id",
            lang: eventData?.lang || "en",
            currency: eventData?.currency || "IDR",
            intf: eventData?.intf || "mobile",
            pageId: eventData?.pageId || uuidv4(),
            pageName: eventData?.pageName || document.title,
            storefront: eventData?.storefront || "travel",
            funnelSource: eventData?.funnelSource || "default_source",
            clientTimestamp: Date.now(),
            requestId: eventData?.requestId || uuidv4(),
            eventAction: eventData?.eventAction || "END OF FEED",
            deeplinkUrl: window.location.href,
            sections: [
                {
                    sectionId,
                    sectionName,
                    widget: "DEFAULT_WIDGET",
                    position: 1,
                    activeFilter,
                    filters: searchParams.toString() || null,
                    details: {
                        currentURL: window.location.href,
                        referrer: document.referrer || "direct",
                    },
                },
            ],
            event: eventData?.event || "TRACK",
            "gtm.uniqueEventId": Date.now(),
        };

        if (!window.dataLayer) {
            window.dataLayer = [];
        }
        window.dataLayer.push(dynamicEventData);
    }, [pathname, searchParams, currentLocation, eventData]);

    // ✅ Gaya yang berbeda berdasarkan ukuran layar
    const consentStyles = {
        mobile: {
            width: "95%",
            maxWidth: "100%",
            padding: "1rem",
            borderRadius: "0.5rem",
        },
        tablet: {
            width: "90%",
            maxWidth: "600px",
            padding: "1.5rem",
            borderRadius: "0.75rem",
        },
        desktop: {
            width: "100%",
            maxWidth: "32rem",
            padding: "1.5rem",
            borderRadius: "0.5rem",
        },
    };

    return (
        <>
            <GoogleAnalytics trackPageViews />
            <CookieConsent
                location="bottom"
                buttonText="Terima"
                declineButtonText="Tolak"
                enableDeclineButton
                style={{
                    background: "transparent",
                    position: "fixed",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    ...consentStyles[screenType], // ✅ Terapkan gaya sesuai screen type
                }}
                buttonStyle={{
                    background: "#1B8386",
                    color: "#fff",
                    fontSize: screenType === "mobile" ? "12px" : "14px",
                    padding: screenType === "mobile" ? "0.4rem 0.8rem" : "0.5rem 1rem",
                    borderRadius: "0.5rem",
                }}
                declineButtonStyle={{
                    background: "#f44336",
                    color: "#fff",
                    fontSize: screenType === "mobile" ? "12px" : "14px",
                    padding: screenType === "mobile" ? "0.4rem 0.8rem" : "0.5rem 1rem",
                    borderRadius: "0.5rem",
                }}
            >
                <h3
                    style={{
                        color: "#333",
                        fontSize: screenType === "mobile" ? "1rem" : "1.25rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                    }}
                >
                    Persetujuan Cookie
                </h3>
                <p
                    style={{
                        color: "#333",
                        fontSize: screenType === "mobile" ? "0.875rem" : "1rem",
                        marginBottom: "1rem",
                    }}
                >
                    Situs web ini menggunakan cookie untuk memastikan Anda mendapatkan pengalaman terbaik.
                </p>
            </CookieConsent>
        </>
    );
}
