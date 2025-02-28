import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import { GET, OPTIONS } from "@/app/api/landing/route";
import { NextResponse } from "next/server";

// Mock LandingService dan LandingRepository
jest.mock("@/modules/landing/application/landingService");
jest.mock("@/modules/landing/infrastructure/landingRepository");

describe("API /api/landing", () => {
    let mockLandingService: jest.Mocked<LandingService>;

    beforeEach(() => {
        jest.clearAllMocks(); // Reset semua mock sebelum setiap test
        const mockRepo = new LandingRepository() as jest.Mocked<LandingRepository>;
        mockLandingService = new LandingService(mockRepo) as jest.Mocked<LandingService>;

        // Inject mock instance ke API handler
        jest.spyOn(LandingService.prototype, "getLandingData").mockImplementation(mockLandingService.getLandingData);
    });

    test("✅ GET /api/landing - Berhasil mendapatkan data", async () => {
        // **1️⃣ Arrange** - Simulasi response sukses dari service
        const mockData = {
            data: {
                heroContent: {
                    title: "Selamat Datang",
                    description: "Jelajahi perjalanan terbaik",
                    tagsLine: "Umroh | Haji | Wisata Halal",
                    buttonLabel: "Lihat Paket",
                    imageUrl: "/images/hero.jpg",
                    altText: "Hero Image",
                },
                singlePackage: {
                    header: { title: "Paket Umroh" },
                    silver: {
                        id: "silver",
                        image: "/images/silver.jpg",
                        tags: [{ icon: "calendar", label: "9 Hari" }],
                        title: "Paket Silver",
                        date: "2025-04-15",
                        details: [{ icon: "hotel", label: "Hotel", value: "Madinah Hilton", altText: "Hotel" }],
                        price: { current: "Rp15.000.000", original: "Rp18.000.000" },
                        buttonLabel: "Pesan Sekarang",
                    },
                    gold: {
                        id: "gold",
                        image: "/images/gold.jpg",
                        tags: [{ icon: "calendar", label: "12 Hari" }],
                        title: "Paket Gold",
                        date: "2025-05-10",
                        details: [{ icon: "hotel", label: "Hotel", value: "Makkah Tower", altText: "Hotel" }],
                        price: { current: "Rp20.000.000", original: "Rp23.000.000" },
                        buttonLabel: "Pesan Sekarang",
                    },
                    platinum: {
                        id: "platinum",
                        image: "/images/platinum.jpg",
                        tags: [{ icon: "calendar", label: "15 Hari" }],
                        title: "Paket Platinum",
                        date: "2025-06-20",
                        details: [{ icon: "hotel", label: "Hotel", value: "Madinah Royal", altText: "Hotel" }],
                        price: { current: "Rp25.000.000", original: "Rp28.000.000" },
                        buttonLabel: "Pesan Sekarang",
                    },
                },
                packagesContent: {
                    silver: { header: { title: "Silver Package" }, packages: [] },
                    gold: { header: { title: "Gold Package" }, packages: [] },
                    platinum: { header: { title: "Platinum Package" }, packages: [] },
                },
                featuresContent: {
                    header: { title: "Kenapa Memilih Kami" },
                    title: "Keunggulan Kami",
                    benefits: [{ title: "Harga Terjangkau", subtitle: "Harga terbaik", logo: "/icons/price.svg" }],
                    footerTitle: "Lebih banyak keunggulan",
                    buttonAbout: "Tentang Kami",
                    buttonPackage: "Lihat Paket",
                },
                momentsContent: {
                    header: { title: "Kenangan Perjalanan" },
                    images: ["/images/moment1.jpg", "/images/moment2.jpg"],
                },
                affiliateContent: {
                    header: { title: "Mitra Kami" },
                    affiliates: [{ name: "Travel Partner", logo: "/logos/partner.svg", width: 100, height: 50 }],
                },
                testimonialContent: {
                    header: { title: "Testimoni Pelanggan" },
                    reviews: [{ id: 1, reviewer: "Ahmad", age: 35, address: "Jakarta", rating: 5, review: "Sangat memuaskan!", date: "2024-10-01" }],
                },
                faqContent: {
                    header: { title: "FAQ" },
                    faqs: [{ id: 1, question: "Apa itu paket Silver?", answer: "Paket Silver adalah paket umroh ekonomis." }],
                },
                mobileMenu: [{ icon: "home", label: "Beranda", path: "/" }],
            },
            status: 200
        };

        mockLandingService.getLandingData.mockResolvedValue(mockData);

        // **2️⃣ Act** - Panggil API Handler
        const response = await GET();

        // **3️⃣ Assert** - Pastikan response valid
        expect(response).toBeInstanceOf(NextResponse)
        expect(response.status).toBe(200);

        // **4️⃣ Cek isi JSON response**
        const jsonResponse = await response.json();
        expect(jsonResponse).toEqual(mockData); // ✅ Directly compare with mockData
    });

    test("❌ GET /api/landing - Gagal mengambil data (Internal Server Error)", async () => {
        // **1️⃣ Arrange** - Simulasi service gagal
        mockLandingService.getLandingData.mockRejectedValue(new Error("Internal Server Error"));

        // **2️⃣ Act** - Panggil API Handler
        const response = await GET();

        // **3️⃣ Assert** - Pastikan response valid
        expect(response).toBeInstanceOf(NextResponse) // ✅ Pastikan response adalah NextResponse
        expect(response.status).toBe(500);

        // **4️⃣ Cek isi JSON response**
        const jsonResponse = await response.json();
        expect(jsonResponse).toEqual({ data: null, error: "Internal Server Error" });

    });

    test("✅ OPTIONS /api/landing - Preflight Request CORS", async () => {
        // **1️⃣ Act** - Panggil OPTIONS handler
        const response = await OPTIONS();

        // **2️⃣ Assert** - Periksa response
        expect(response).toBeInstanceOf(NextResponse) // ✅ Pastikan response adalah NextResponse
        expect(response.status).toBe(204);
        expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
        expect(response.headers.get("Access-Control-Allow-Methods")).toContain("GET, OPTIONS");
    });
});
