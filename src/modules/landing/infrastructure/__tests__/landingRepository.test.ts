import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import {dummyLandingData} from "@/modules/landing/infrastructure/landingDumyData";

// ✅ Mock fetch API
global.fetch = jest.fn();

describe("LandingRepository", () => {
    let landingRepository: LandingRepository;

    beforeEach(() => {
        landingRepository = new LandingRepository();
        jest.clearAllMocks(); // 🔄 Reset mock setiap test case
    });

    /**
     * ✅ Use Case Positif
     * Jika API memberikan respons sukses, maka harus mengembalikan data yang diharapkan.
     */
    it("✅ should return landing data from API", async () => {
        // **1️⃣ Arrange** - Setup data mock
        const mockData = { title: "Test Title", description: "Test Description" };
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });

        // **2️⃣ Act** - Panggil fungsi yang akan dites
        const result = await landingRepository.getLandingContent();

        // **3️⃣ Assert** - Periksa apakah hasilnya sesuai harapan
        expect(result.data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    /**
     * ❌ Use Case Negatif
     * Jika API gagal (misalnya, error 404), maka harus mengembalikan dummy data.
     */
    it("⚠️ should return dummy data if API fails", async () => {
        // **1️⃣ Arrange** - Setup fetch untuk gagal
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 404,
            statusText: "Not Found",
        });

        // **2️⃣ Act** - Panggil fungsi yang akan dites
        const result = await landingRepository.getLandingContent();

        // **3️⃣ Assert** - Pastikan dummy data yang dikembalikan
        expect(result.data).toEqual(dummyLandingData);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    /**
     * ❌ Use Case Negatif
     * Jika API fetch mengalami error (misalnya, jaringan terputus), maka harus mengembalikan dummy data.
     */
    it("⚠️ should return dummy data if API request fails with an error", async () => {
        // **1️⃣ Arrange** - Simulasi fetch yang melempar error
        (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

        // **2️⃣ Act** - Panggil fungsi
        const result = await landingRepository.getLandingContent();

        // **3️⃣ Assert** - Harus mengembalikan dummy data
        expect(result.data).toEqual(dummyLandingData)
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});

