import { NextResponse } from "next/server";

export async function GET() {  // Removed 'req'
    const baseUrl = "https://www.mywebsite.com";

    const urls = [
        "/",
        "/about",
        "/services",
        "/contact",
        "/blog",
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
            (url) => `
        <url>
          <loc>${baseUrl}${url}</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
