import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/__forms.html", "/privacy"] },
    sitemap: "https://xiteon.com/sitemap.xml",
  };
}
