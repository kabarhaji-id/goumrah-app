"use client";

import {useFooterData} from "@/shared/libs/useFooterFetch";
import FooterError from "@/shared/ui/layout/components/footer-error";
import CompanyInfo from "@/shared/ui/layout/components/company-info";
import LinkGroup from "@/shared/ui/layout/components/link-group";
import DownloadInfo from "@/shared/ui/layout/components/download-info";
import {useScreenType} from "@/shared/libs/useScreenTypes";
import SocialIconGroup from "@/shared/ui/layout/components/social-icon-block"; // Import useScreenType

/**
 * Footer component that displays company info, navigation links, and download section.
 * Handles errors when data fetching fails.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer: React.FC = () => {
    const {footerData, isError, error, refetch} = useFooterData();
    const screenType = useScreenType(); // Deteksi ukuran layar

    // Show error component if data fetching failed
    if (isError) {
        return <FooterError error={error} onRetry={refetch}/>;
    }

    // Jika `footerData` belum tersedia, jangan render apapun
    if (!footerData) {
        return null;
    }

    const {companyInfo, pageLinks, productLinks, downloadInfo} = footerData;
    const currentYear = new Date().getFullYear();

    return (

        <div style={screenType !== "desktop" ? {paddingBottom: "3rem"} : {}}>

            <footer
                className="flex flex-col items-center px-52 py-12 bg-teal-600 max-md:px-10 max-md:py-12 max-sm:px-5 max-sm:pt-8"
                aria-label="Site footer"
            >
                <div
                    className="flex gap-12 justify-center items-start w-full max-w-[1200px] max-md:flex-wrap max-md:gap-8 max-sm:flex-col max-sm:gap-8">
                    <CompanyInfo data={companyInfo}/>
                    <LinkGroup data={pageLinks}/>
                    <LinkGroup data={productLinks}/>
                    <DownloadInfo data={downloadInfo}/>
                </div>

            </footer>

            <div className="flex justify-between items-start p-5 w-full bg-emerald-950">
                <div
                    className="flex justify-between items-start mx-auto my-0 w-full flex-[1_0_0] max-w-[1200px] max-md:px-5 max-md:py-0 max-sm:flex-col max-sm:gap-4 max-sm:items-center max-sm:text-center">
                    <p className="text-sm leading-5 opacity-[0.92] text-white text-opacity-80 max-sm:text-xs">
                        &copy; {currentYear} goumroh.id - PT Kabar Haji Indonesia. All Rights
                        Reserved
                    </p>
                    <SocialIconGroup />
                </div>
            </div>
        </div>


    );
};

export default Footer;
