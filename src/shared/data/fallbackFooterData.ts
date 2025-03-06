import { FooterData } from "@/shared/types/FooterTypes";

export const fallbackFooterData: FooterData = {
    companyInfo: {
        office: {
            address: "RT.1/RW.9, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12740",
        },
        customerService: {
            phone: "+6281234567890",
            email: "info@goumroh.id",
        },
        ppiuLicense: {
            licenseNumber: "0247 0101 4295 30001",
            licenseDetails: "No U.140 Tahun 2024",
        },
    },
    pageLinks: {
        title: "Pages",
        links: [
            { text: "Beranda", href: "/" },
            { text: "Paket Umroh", isNew: true, href: "/paket-umroh" },
            { text: "Blog dan Artikel", href: "/blog" },
            { text: "GoumrahCare", href: "/care" },
            { text: "Tentang Kami", href: "/about" },
        ],
    },
    productLinks: {
        title: "Paket Umroh",
        links: [
            { text: "Paket Umroh Paling Hemat", href: "/paket-umroh/paling-hemat" },
            { text: "Paket Umroh Hemat", href: "/paket-umroh/hemat" },
            { text: "Paket Umroh Cerdas", href: "/paket-umroh/cerdas" },
            {
                text: "Paket Umroh Cerdas Plus Wisata",
                href: "/paket-umroh/cerdas-plus-wisata",
            },
            { text: "Paket Umroh Eksklusif", href: "/paket-umroh/eksklusif" },
            { text: "Voucher Wisata", href: "/voucher-wisata" },
        ],
    },
    downloadInfo: {
        sectionTitle: "Unduh Aplikasi goumrah.id",
        appStore: "https://apps.apple.com/app/goumroh",
        playStore: "https://play.google.com/store/apps/details?id=id.goumroh.app",
    },
};
