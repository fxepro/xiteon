import type { MetadataRoute } from "next";
import { audiences, services } from "@/lib/content";

const BASE = "https://xiteon.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/join", "/contact", "/trust", "/impact", "/about"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...audiences.map((a) => ({ url: `${BASE}/solutions/${a.slug}`, priority: 0.8 })),
    ...services.map((s) => ({ url: `${BASE}/services/${s.slug}`, priority: 0.8 })),
  ];
}
