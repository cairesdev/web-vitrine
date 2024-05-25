import { backendFetch } from "@/infra/adapter";
import { AllBannerList } from "@/types/banner";
import { TAGS } from "@/constants";

interface ErrorResponse {
  error: string;
  message: string;
}

export async function getAllBanner(): Promise<AllBannerList> {
  try {
    const response = await backendFetch<AllBannerList | ErrorResponse>({
      method: "GET",
      route: `banner/show_all`,
      tags: [TAGS.banner],
    });

    if ("error" in response) {
      console.error(response);
      throw new Error(response.body.message);
    }

    return response.body as AllBannerList;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar banners");
  }
}
