import { getAllProduct } from "@/lib/backend/product";
import { validateEnvironmentVariables } from "@/utils/utils";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_PROD
  ? `https://${process.env.NEXT_PUBLIC_API_PROD}`
  : "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  // Define the base routes
  const routesMap = ["/", "/produto"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const { result } = await getAllProduct();
  let lastModified = new Date().toISOString();

  const productsPromise = result.map((product) => ({
    url: `${baseUrl}/product/${product._id}`,
    lastModified: lastModified,
  }));

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = await productsPromise;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw new Error("Erro ao gerar o sitemap");
  }

  return [...routesMap, ...fetchedRoutes];
}
