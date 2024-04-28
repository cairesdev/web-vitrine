import { Iresponse } from "@/models/products";
import api from "@/services/api";

export const getProducts = async () => {
  const response = await api.get<Iresponse>("produto/show_all");
  return response.data;
};
