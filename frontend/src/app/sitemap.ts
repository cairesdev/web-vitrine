import { getAllProduct } from "@/lib/backend/product";
import { MetadataRoute } from "next";

const baseUrl = process.env.STORE_DOMAIN
  ? `https://${process.env.STORE_DOMAIN}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { result } = await getAllProduct();

  const routes = result.map((product) => ({
    url: `${baseUrl}/produto/${product._id}`,
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
    ...routes,
  ];
}
