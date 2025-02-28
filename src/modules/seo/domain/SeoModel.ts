export interface OpenGraphImage {
    url: string;
    width: number;
    height: number;
    alt: string;
}

export interface OpenGraph {
    type: string;
    locale: string;
    url: string;
    site_name: string;
    title: string;
    description: string;
    images: OpenGraphImage[];
}

export interface Twitter {
    cardType: string;
    site: string;
    creator: string;
    title: string;
    description: string;
    image: string;
}

export interface MetaTag {
    name: string;
    content: string;
}

export interface SEOConfig {
    title: string;
    titleTemplate: string;
    defaultTitle: string;
    description: string;
    openGraph: OpenGraph;
    twitter: Twitter;
    additionalMetaTags: MetaTag[];
}