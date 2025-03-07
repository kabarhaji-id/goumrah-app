import { render } from "@testing-library/react";
import { DefaultSeo, NextSeo } from "next-seo";
import { Seo } from "@/sections/seo";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";
import { fallbackSeoData } from "@/modules/seo/constants/fallbackSeo";

// Mocking next-seo components
jest.mock("next-seo", () => ({
    DefaultSeo: jest.fn(() => null),
    NextSeo: jest.fn(() => null),
}));

describe("Seo Component", () => {
    let mockSeoData: SEOConfig;

    beforeEach(() => {
        jest.clearAllMocks();
        mockSeoData = {
            title: "Mock Title",
            titleTemplate: "%s | Mock Site",
            defaultTitle: "Mock Default Title",
            description: "Mock Description",
            openGraph: {
                type: "website",
                locale: "en_US",
                url: "https://mock-url.com",
                site_name: "Mock Site",
                title: "Mock OpenGraph Title",
                description: "Mock OpenGraph Description",
                images: [
                    {
                        url: "https://mock-url.com/og-image.jpg",
                        width: 1200,
                        height: 630,
                        alt: "Mock OG Image",
                    },
                ],
            },
            twitter: {
                cardType: "summary_large_image",
                site: "@mock",
                creator: "@mock",
                title: "Mock Twitter Title",
                description: "Mock Twitter Description",
                image: "https://mock-url.com/twitter-image.jpg",
            },
            additionalMetaTags: [{ name: "robots", content: "index, follow" }],
        };
    });

    it("should render DefaultSeo and NextSeo with given metadata (Positive Case)", () => {
        // Arrange: Set up data and expectations
        render(<Seo metadata={mockSeoData} />);

        // Act: Render component
        expect(DefaultSeo).toHaveBeenCalled();

        // Debugging output
        console.log("Actual DefaultSeo call:", (DefaultSeo as jest.Mock).mock.calls);
        console.log("Actual NextSeo call:", (NextSeo as jest.Mock).mock.calls);

        // ✅ Ensure DefaultSeo is called
        expect((DefaultSeo as jest.Mock).mock.calls[0][0]).toMatchObject({
            title: mockSeoData.title,
            titleTemplate: mockSeoData.titleTemplate,
            defaultTitle: mockSeoData.defaultTitle,
            description: mockSeoData.description,
            canonical: expect.any(String),
            openGraph: expect.objectContaining({
                title: mockSeoData.openGraph.title,
                description: mockSeoData.openGraph.description,
                images: expect.arrayContaining(mockSeoData.openGraph.images),
            }),
            twitter: expect.objectContaining({
                title: mockSeoData.twitter.title,
                description: mockSeoData.twitter.description,
                image: expect.any(String),
            }),
            additionalMetaTags: expect.arrayContaining(mockSeoData.additionalMetaTags),
        });

        // ✅ Ensure NextSeo is called
        expect(NextSeo).toHaveBeenCalled();
        expect((NextSeo as jest.Mock).mock.calls[0][0]).toMatchObject({
            title: mockSeoData.title,
            description: mockSeoData.description,
            canonical: expect.any(String),
            openGraph: expect.objectContaining({
                title: mockSeoData.openGraph.title,
                description: mockSeoData.openGraph.description,
                images: expect.arrayContaining(mockSeoData.openGraph.images),
            }),
            twitter: expect.objectContaining({
                title: mockSeoData.twitter.title,
                description: mockSeoData.twitter.description,
                image: expect.any(String),
            }),
        });
    });

    it("should render DefaultSeo and NextSeo with fallback metadata when empty (Negative Case)", () => {
        render(<Seo metadata={{} as SEOConfig} />);

        expect(DefaultSeo).toHaveBeenCalled();
        expect(NextSeo).toHaveBeenCalled();
    });

    it("should render without error when metadata is empty (Negative Case)", () => {
        render(<Seo metadata={{} as SEOConfig} />);

        expect(DefaultSeo).toHaveBeenCalled();
        expect(NextSeo).toHaveBeenCalled();
    });
});
