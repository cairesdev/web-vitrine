export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCIA" | "MAIS_VENDIDO" | "CRIADO_EM" | "PREÇO";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevância",
  slug: null,
  sortKey: "RELEVANCIA",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Tendencias",
    slug: "tendencia-desc",
    sortKey: "MAIS_VENDIDO",
    reverse: false,
  }, // asc
  {
    title: "Adicionados recente",
    slug: "latest-desc",
    sortKey: "CRIADO_EM",
    reverse: true,
  },
  {
    title: "Preço: baixo a alto",
    slug: "price-asc",
    sortKey: "PREÇO",
    reverse: false,
  }, // asc
  {
    title: "Preço: alto a baixo",
    slug: "price-desc",
    sortKey: "PREÇO",
    reverse: true,
  },
];

export const TAGS = {
  collections: "coleções",
  products: "produtos",
  banner: "banners",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Titulo Padrão";

export enum Limit {
  RECOMENDACOES = 10,
  SIMILARES = 6,
}
