export interface IProduct {
  _id: string;
  NOME: string;
  DESCRICAO: string;
  IMAGEM: string;
  CATEGORIA: string;
  STATUS: string;
  __v: number;
}

export interface Iresponse {
  message: string;
  quantidade?: number;
  results: IProduct[];
}

export interface IResponseUnique {
  message: string;
  result: IProduct;
}
