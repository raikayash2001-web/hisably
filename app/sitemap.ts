import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hisably.com";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools/gst-calculator/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/privacy/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/disclaimer/`, changeFrequency: "yearly", priority: 0.2 }
  ];
}