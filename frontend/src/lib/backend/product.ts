import { backendFetch } from "@/infra";
import {
  BackendProductsOperation,
  Image,
  Product,
  TProduct,
} from "@/types/products";
import { TAGS, HIDDEN_PRODUCT_TAG } from "@/constants/sort";

export async function getProducts({
  reverse,
  sortKey,
}: {
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const variables = {
    reverse: reverse,
    sortKey: sortKey,
  };

  const res = await backendFetch<BackendProductsOperation>({
    method: "GET",
    route: "produto/show_all",
    tags: [TAGS.products],
    variables: variables,
  });

  return reshapeProducts(res.body.data.produtos);
}

const reshapeProducts = (products: TProduct[]): Product[] => {
  const reshapedProducts: Product[] = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

const reshapeProduct = (
  product: TProduct,
  filterHiddenProducts: boolean = true
): Product | undefined => {
  if (
    !product ||
    (filterHiddenProducts &&
      product.tags &&
      product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { IMAGEM, variants, ...rest } = product;

  return {
    ...rest,
    IMAGEM: reshapeImages(IMAGEM, product.NOME),
    variants: variants,
  } as any;
};

const reshapeImages = (images: Image[], productTitle: string): Image[] => {
  return images.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1] || "";
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};
