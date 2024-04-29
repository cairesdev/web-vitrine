import { AxiosResponse, AxiosError, AxiosInstance } from "axios";

export interface HttpClient {
  request: (data: HttpRequest) => Promise<AxiosResponse | AxiosError>;
}

export type HttpRequest = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  headers?: any;
};

export class AxiosHttpClient implements HttpClient {
  constructor(private readonly axios: AxiosInstance) {}

  async request(
    data: HttpRequest
  ): Promise<AxiosResponse<any> | AxiosError<any>> {
    try {
      const axiosResponse = await this.axios.request({
        url: data.url,
        method: data.method,
        data: data.data,
        headers: data.headers,
      });
      return { ...axiosResponse, data: axiosResponse.data };
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.message || "Erro desconhecido"
        );
      } else if (axiosError.request) {
        throw new Error("Nenhuma resposta foi enviada pelo servidor");
      } else {
        throw new Error("Erro de conexão aconteceu");
      }
    }
  }
}
