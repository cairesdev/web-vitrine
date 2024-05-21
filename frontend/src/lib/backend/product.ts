import { backendFetch } from "@/infra/adapter";
import { AllProductList, UniqueProduct } from "@/types/product";
import { TAGS, HIDDEN_PRODUCT_TAG } from "@/constants";

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

export async function getAllProduct(): Promise<AllProductList> {
  try {
    const response = await backendFetch<AllProductList | ErrorResponse>({
      method: "GET",
      route: `produto/show_all`,
      data: {},
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
