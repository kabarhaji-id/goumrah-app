"use client";

/**
 * Interface for office information
 */
export interface OfficeInfo {
    address: string;
}

/**
 * Interface for customer service information
 */
export interface CustomerServiceInfo {
    phone: string;
    email: string;
}

/**
 * Interface for PPIU license information
 */
export interface PPIULicenseInfo {
    licenseNumber: string;
    licenseDetails: string;
}

/**
 * Interface for company information
 */
export interface CompanyInfoData {
    office: OfficeInfo;
    customerService: CustomerServiceInfo;
    ppiuLicense: PPIULicenseInfo;
}

/**
 * Interface for a footer link
 */
export interface FooterLinkItem {
    text: string;
    isNew?: boolean;
    href: string;
}

/**
 * Interface for a link group
 */
export interface LinkGroupData {
    title: string;
    links: FooterLinkItem[];
}

/**
 * Interface for app download information
 */
export interface AppDownloadData {
    appStore: {
        href: string;
        imageSrc: string;
        imageAlt: string;
    };
    googlePlay: {
        href: string;
        downloadText: string;
        storeName: string;
        imageSrc: string;
        imageAlt: string;
    };
    sectionTitle: string;
}

/**
 * Interface for all footer data
 */
export interface FooterData {
    companyInfo: CompanyInfoData;
    pageLinks: LinkGroupData;
    productLinks: LinkGroupData;
    downloadInfo: AppDownloadData;
}
