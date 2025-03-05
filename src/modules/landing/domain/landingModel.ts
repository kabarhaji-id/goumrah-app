export interface LandingContent {
    heroContent: HeroContent;
    singlePackage: SinglePackageContent;
    packagesContent: PackagesContent;
    featuresContent: FeaturesContent;
    momentsContent: MomentsContent;
    affiliateContent: AffiliatesContent;
    testimonialContent: TestimonialContent;
    faqContent: FAQContent;
    mobileMenu: NavIcon[];
}

// Hero Section
export interface HeroContent {
    title: string;
    description: string;
    tagsLine: string;
    buttonLabel: string;
    imageUrl?: string | null;
    altText: string;
    buttonUrl?: string | null;
}

// Affiliates Section
export interface AffiliatesContent {
    header: SectionHeader;
    affiliates: Affiliate[];
}

export interface Affiliate {
    name: string;
    logo: string;
    width: number;
    height: number;
}

// FAQ Section
export interface FAQContent {
    header: SectionHeader;
    faqs: FAQ[];
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
}

// Features Section
export interface FeaturesContent {
    header: SectionHeader;
    benefits: Benefit[];
    footerTitle: string;
    buttonAbout: string;
    buttonPackage: string;
}

export interface Benefit {
    id: number;
    title: string;
    subtitle: string;
    logo: string;
}

// Moments Section
export interface MomentsContent {
    header: SectionHeader;
    images: string[]; // Array of image URLs
}

// Packages Section
export interface PackagesContent {
    silver: PackageDetail;
    gold: PackageDetail;
    platinum: PackageDetail;
}

export interface PackageDetail {
    header: SectionHeader;
    packages: PackageItem[];
}

export interface PackageItem {
    id: string; // e.g., "silver", "gold", "platinum"
    image: string;
    tags: Tag[];
    title: string;
    departureDate: DepartureDates[];
    details: PackageDetailItem[];
    price: Price;
    buttonLabel: string;
    category: string;
}

export interface DepartureDates {
    date: string;
    status: string;
}

export interface PackageDetailItem {
    icon: string; // e.g., "airline", "hotel"
    label: string; // e.g., "Madinah", "Makkah", "Maskapai"
    value: string; // e.g., "Lion Air", "Al Marwah Rayhan by Rotana"
    altText: string; // e.g., "Airline", "Hotel"
    rating: number;
}

// Single Package Section
export interface SinglePackageContent {
    header: SectionHeader;
    silver: PackageItem;
    gold: PackageItem;
    platinum: PackageItem;
}

// Testimonial Section
export interface TestimonialContent {
    header: SectionHeader;
    reviews: Testimonial[];
}

export interface Testimonial {
    id: number;
    reviewer: string;
    age: number;
    address: string;
    rating: number;
    review: string;
    date: string; // Assuming a string date format
}

// Common Elements
export interface SectionHeader {
    title: string;
    subtitle?: string;
    tagsLine?: string;
}

export interface Price {
    quadPrice: number,
    triplePrice: number,
    doublePrice: number,
    infantPrice: number,
    quadFinalPrice: number,
    tripleFinalPrice: number,
    doubleFinalPrice: number,
    infantFinalPrice: number,
}

export interface Tag {
    icon: string;
    label: string;
}

export interface NavIcon {
    icon: string;
    label: string;
    path: string;
}
