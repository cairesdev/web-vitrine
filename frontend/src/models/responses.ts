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
  error?: any;
}

export interface IResponseUnique {
  message: string;
  result: IProduct;
}

export interface ICategoria {
  _id: string;
  NOME: string;
  IMAGEM: string;
  __v: number;
}

export interface IResponseCategoria {
  message: string;
  results: ICategoria[];
}
