import api from "@/services/api";
import { IResponseCategoria } from "@/models/responses";
import { AxiosHttpClient, HttpRequest } from "@/infra/adapters";

const HttpClient = new AxiosHttpClient(api);

export const getCategorias = async () => {
  const requestData: HttpRequest = {
    method: "GET",
    url: "categoria/show_all",
  };
  try {
    const response = await HttpClient.request(requestData);
    if ("data" in response) {
      return response.data as IResponseCategoria;
    } else {
      throw new Error(
        "Ocorreu um erro durante a requisição, nenhum 'data' foi recebido."
      );
    }
  } catch (error) {
    console.log("Erro ao tentar capturar os produtos: ", error);
    throw error;
  }
};
