export type TProduct = {
  _id: string;
  __v: number;
  NOME: string;
  DESCRICAO: string;
  CATEGORIA: string;
  STATUS: string;
  tags?: string[];
  IMAGEM: Image[];
  variants: TProductVariant[];
};

export type TProductVariant = {
  _id: string;
  __v: number;
  NOME: string;
  DESCRICAO: string;
  IMAGEM: Image;
  CATEGORIA: string;
  STATUS: string;
  tags?: string[];
};

export type Product = Omit<TProduct, "variants" | "images"> & {
  variants: TProductVariant[];
  images: Image[];
};

export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type SEO = {
  title: string;
  description: string;
};

export type BackendProductsOperation = {
  data: {
    produtos: TProduct[];
  };
  variables: {
    sortKey?: string;
    reverse?: boolean;
  };
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};
