import api from "@/services/api";
import { IResponseUnique, Iresponse } from "@/models/responses";
import { AxiosHttpClient, HttpRequest } from "@/infra/adapters";

const HttpClient = new AxiosHttpClient(api);

export const getProducts = async () => {
  const requestData: HttpRequest = {
    method: "GET",
    url: "produto/show_all",
  };
  try {
    const response = await HttpClient.request(requestData);
    if ("data" in response) {
      return response.data as Iresponse;
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

export const getProduct = async (id: string) => {
  const requestData: HttpRequest = {
    method: "GET",
    url: `produto/show_uinque/${id}`,
  };
  try {
    const response = await HttpClient.request(requestData);
    if ("data" in response) {
      return response.data as IResponseUnique;
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

export const deleteProduct = async (id: string, image: string) => {
  const requestData: HttpRequest = {
    method: "DELETE",
    url: `produto/delete/${id}/${image}`,
  };
  try {
    const response = await HttpClient.request(requestData);
    return response;
  } catch (error) {
    console.log("Erro ao tentar excluir: ", error);
    throw error;
  }
};

export const useCreateProduct = async (data: any) => {
  const requestData: HttpRequest = {
    method: "POST",
    url: "produto/create_new/produtos",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await HttpClient.request(requestData);
  return response;
};
