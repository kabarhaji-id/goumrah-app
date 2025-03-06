export interface EventData {
    event_name?: string;
    country?: string;
    lang?: string;
    currency?: string;
    intf?: string;
    pageId?: string;
    pageName?: string;
    storefront?: string;
    funnelSource?: string;
    clientTimestamp?: number;
    requestId?: string;
    eventAction?: string;
    deeplinkUrl?: string;
    sections?: {
        sectionId: string;
        sectionName: string;
        widget: string;
        position: number;
        activeFilter: string | null;
        filters: string | null;
        details?: unknown;
    }[];
    event?: string;
    "gtm.uniqueEventId"?: number;

    [key: string]: unknown; // ✅ Tambahkan ini agar fleksibel
}



export interface SectionData {
    sectionId: string;
    sectionName: string;
    widget: string;
    position: number;
    activeFilter: string | null;
    filters: string | null;
    details?: unknown;
}
