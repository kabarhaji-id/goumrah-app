"use client";

import { useFooterData } from "@/shared/libs/useFooterFetch";
import FooterError from "@/shared/ui/layout/components/footer-error";
import CompanyInfo from "@/shared/ui/layout/components/company-info";
import LinkGroup from "@/shared/ui/layout/components/link-group";
import DownloadInfo from "@/shared/ui/layout/components/download-info";

/**
 * Footer component that displays company info, navigation links, and download section.
 * Shows skeleton loaders while data is being fetched and handles errors.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer: React.FC = () => {
    const { footerData, isLoading, isError, error, refetch } = useFooterData();

    // Show skeleton while data is being fetched
    if (isLoading) {
        return (
            <footer
                className="flex flex-col items-center px-52 py-12 bg-teal-600 max-md:px-10 max-md:py-12 max-sm:px-5 max-sm:py-8"
                aria-label="Site footer loading"
            >
                <div className="flex gap-12 justify-center items-start w-full max-w-[1200px] max-md:flex-wrap max-md:gap-8 max-sm:flex-col max-sm:gap-8">
                    {/* Company Info Skeleton */}
                    <div className="flex flex-col flex-1 gap-4 items-start min-w-[360px] max-md:min-w-[300px] max-sm:w-full max-sm:min-w-[unset] animate-pulse">
                        <div className="w-[127px] h-[27px] bg-teal-500 rounded"></div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="h-6 w-24 bg-teal-500 rounded"></div>
                            <div className="h-5 w-full bg-teal-500 rounded"></div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="h-6 w-36 bg-teal-500 rounded"></div>
                            <div className="h-5 w-32 bg-teal-500 rounded"></div>
                            <div className="h-5 w-40 bg-teal-500 rounded"></div>
                        </div>
                        <div className="mx-0 my-4 w-full h-px bg-teal-50"></div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex gap-2 items-center">
                                <div className="h-[41px] w-[46px] bg-teal-500 rounded"></div>
                                <div className="h-[36px] w-[85px] bg-teal-500 rounded"></div>
                            </div>
                            <div>
                                <div className="h-6 w-32 bg-teal-500 rounded mt-1"></div>
                                <div className="h-6 w-40 bg-teal-500 rounded mt-1"></div>
                                <div className="h-5 w-36 bg-teal-500 rounded mt-1"></div>
                            </div>
                        </div>
                    </div>

                    {/* Pages Links Skeleton */}
                    <div className="flex flex-col gap-6 min-w-40 animate-pulse">
                        <div className="h-6 w-20 bg-teal-500 rounded"></div>
                        <div className="flex flex-col gap-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-6 w-28 bg-teal-500 rounded"></div>
                            ))}
                        </div>
                    </div>

                    {/* Product Links Skeleton */}
                    <div className="flex flex-col gap-6 min-w-40 animate-pulse">
                        <div className="h-6 w-28 bg-teal-500 rounded"></div>
                        <div className="flex flex-col gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-6 w-40 bg-teal-500 rounded"></div>
                            ))}
                        </div>
                    </div>

                    {/* Download Section Skeleton */}
                    <div className="flex flex-col gap-6 min-w-40 animate-pulse">
                        <div className="h-6 w-48 bg-teal-500 rounded"></div>
                        <div className="flex flex-col gap-4 max-sm:items-center">
                            <div className="w-[203px] h-[57px] bg-teal-500 rounded"></div>
                            <div className="w-[203px] h-[57px] bg-teal-500 rounded"></div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    // Show error component if data fetching failed
    if (isError) {
        return <FooterError error={error} onRetry={refetch} />;
    }

    const { companyInfo, pageLinks, productLinks, downloadInfo } = footerData;

    return (
        <footer
            className="flex flex-col items-center px-52 py-12 bg-teal-600 max-md:px-10 max-md:py-12 max-sm:px-5 max-sm:py-8"
            aria-label="Site footer"
        >
            <div className="flex gap-12 justify-center items-start w-full max-w-[1200px] max-md:flex-wrap max-md:gap-8 max-sm:flex-col max-sm:gap-8">
                <CompanyInfo data={companyInfo} />
                <LinkGroup data={pageLinks} />
                <LinkGroup  data={productLinks} />
                <DownloadInfo data={downloadInfo} />
            </div>
        </footer>
    );
};

export default Footer;
