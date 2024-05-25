import { backendFetch } from "@/infra/adapter";
import { AllProductList, UniqueProduct } from "@/types/product";
import { TAGS } from "@/constants";

interface ErrorResponse {
  error: string;
  message: string;
}

export async function getProduct(id: string): Promise<UniqueProduct> {
  try {
    const response = await backendFetch<UniqueProduct | ErrorResponse>({
      method: "GET",
      route: `produto/show_uinque/${id}`,
      data: {},
      tags: [TAGS.products],
    });

    if ("error" in response) {
      console.error(response);
      throw new Error(response.body.message);
    }

    return response.body as UniqueProduct;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar o produto");
  }
}

export async function getAllProduct({
  limit,
}: {
  limit?: number;
}): Promise<AllProductList> {
  try {
    const response = await backendFetch<AllProductList | ErrorResponse>({
      method: "GET",
      route: `produto/show_all?limit=${limit}`,
      data: {},
      tags: [TAGS.products],
    });

    if ("error" in response) {
      console.error(response);
      throw new Error(response.body.message);
    }

    return response.body as AllProductList;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar o produto");
  }
}

export async function getAllProductByFilters({
  limit,
  query,
}: {
  limit?: number;
  query?: string;
}): Promise<AllProductList> {
  try {
    const response = await backendFetch<AllProductList | ErrorResponse>({
      method: "GET",
      route: `produto/search?limit=${limit}${query ? `&query=${query}` : ""}`,
      data: {},
      tags: [TAGS.products],
    });

    if ("error" in response) {
      console.error(response);
      throw new Error(response.body.message);
    }

    return response.body as AllProductList;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar o produto");
  }
}
