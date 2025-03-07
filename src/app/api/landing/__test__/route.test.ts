import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import { NextResponse } from "next/server";
import { dummyLandingData } from "@/modules/landing/infrastructure/landingDumyData";
import {createLandingHandler, OPTIONS} from "@/app/api/landing/route";

jest.mock("@/modules/landing/infrastructure/landingRepository");

describe("API /api/landing", () => {
    let landingServiceMock: jest.Mocked<LandingService>;
    let landingRepositoryMock: jest.Mocked<LandingRepository>;
    let GET: () => Promise<NextResponse>;

    beforeEach(() => {
        jest.clearAllMocks();

        landingRepositoryMock = new LandingRepository() as jest.Mocked<LandingRepository>;
        landingServiceMock = new LandingService(landingRepositoryMock) as jest.Mocked<LandingService>;

        GET = createLandingHandler(landingServiceMock);

        jest.spyOn(landingServiceMock, "getLandingData");
    });

    test("✅ GET /api/landing - Berhasil mendapatkan data dengan status 200", async () => {
        // **1️⃣ Arrange** - Simulasi response sukses
        const mockData = {
            data: dummyLandingData,
            status: 200
        };

        landingServiceMock.getLandingData.mockResolvedValue(mockData);

        // **2️⃣ Act** - Panggil API Handler
        const response = await GET();

        // **3️⃣ Assert** - Pastikan response valid
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);

        // **4️⃣ Cek isi JSON response**
        const jsonResponse = await response.json();
        expect(jsonResponse).toEqual(mockData);
        expect(landingServiceMock.getLandingData).toHaveBeenCalledTimes(1);
    });

    test("⚠️ GET /api/landing - Service mengembalikan status bukan 200, harus menggunakan dummy data", async () => {
        // **1️⃣ Arrange** - Simulasi response gagal dengan status 500
        const mockData = {
            data: null,
            error: "Service Error",
            status: 500
        };

        landingServiceMock.getLandingData.mockResolvedValue(mockData);

        // **2️⃣ Act** - Panggil API Handler
        const response = await GET();

        // **3️⃣ Assert**
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(500);

        // **4️⃣ Cek isi JSON response**
        const jsonResponse = await response.json();
        expect(jsonResponse).toEqual({
            data: dummyLandingData,
            error: "Service Error"
        });
        expect(landingServiceMock.getLandingData).toHaveBeenCalledTimes(1);
    });

    test("❌ GET /api/landing - Service error, harus menggunakan dummy data dengan Internal Server Error", async () => {
        // **1️⃣ Arrange** - Simulasi service gagal total
        landingServiceMock.getLandingData.mockRejectedValue(new Error("Unexpected Error"));

        // **2️⃣ Act** - Panggil API Handler
        const response = await GET();

        // **3️⃣ Assert**
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(500);

        // **4️⃣ Cek isi JSON response**
        const jsonResponse = await response.json();
        expect(jsonResponse).toEqual({
            data: dummyLandingData,
            error: "Internal Server Error"
        });

        expect(landingServiceMock.getLandingData).toHaveBeenCalledTimes(1);
    });

    test("✅ OPTIONS /api/landing - Preflight Request CORS", async () => {
        // **1️⃣ Act** - Panggil OPTIONS handler
        const response = OPTIONS();

        // **2️⃣ Assert**
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(204);
        expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
        expect(response.headers.get("Access-Control-Allow-Methods")).toContain("GET, OPTIONS");
        expect(response.headers.get("Access-Control-Allow-Headers")).toBe("Content-Type");
    });
});
