import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/glass-demo"] },
    sitemap: "https://www.weareiberico.com/sitemap.xml",
  };
}
