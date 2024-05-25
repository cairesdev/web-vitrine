export type Banner = {
  _id: string;
  __v: number;
  NOME: string;
  CATEGORIA: string;
  IMAGEM: string;
  URL: string;
  DATA: Date;
};

export type UniqueBanner = {
  message: string;
  result: Banner;
  quantidade: number;
};

export type AllBannerList = {
  message: string;
  total: number;
  result: Banner[];
};
