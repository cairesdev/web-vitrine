export type Product = {
  _id: string;
  __v: number;
  NOME: string;
  DESCRICAO: string;
  CATEGORIA: string;
  PRECO: string;
  STATUS: string;
  tags: string[];
  IMAGENS: Image[];
  SEO: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
};

export type Image = {
  url: string;
  altText: string;
  _id: string;
};

export type ProductSimilar = {
  _id: string;
  NOME: string;
  PRECO: string;
  CATEGORIA: string;
  IMAGENS: Image[];
};

export type UniqueProduct = {
  message: string;
  result: Product;
  quantidade: number;
  similares: ProductSimilar[];
};

export type AllProductList = {
  message: string;
  result: Product[];
  quantidade: number;
  total: number;
};
