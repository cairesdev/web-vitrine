import { getAllProduct } from "@/lib/backend/product";
import { MetadataRoute } from "next";

const baseUrl = process.env.STORE_DOMAIN
  ? `https://${process.env.STORE_DOMAIN}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { result } = await getAllProduct({ limit: 30 });

  const routes = result.map((product) => ({
    url: `${baseUrl}/produtos/${product._id}`,
    lastModified: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changefreq: "daily",
      priority: 1,
    },
    {
      url: baseUrl + "/sobre-nos",
      lastModified: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.5,
    },
    ...routes,
  ];
}
