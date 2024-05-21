import SendThisProductForWhats from "@/components/cart/add-to-cart";
import ProductDetails from "@/components/product/details";
import { Gallery, SkeletonGalery } from "@/components/product/gallery";
import ProductSimilars from "@/components/product/similars";
import { getProduct } from "@/lib/backend/product";
import { Image } from "@/types/product";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: {
    produto_id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { result } = await getProduct(params.produto_id);

  if (!result) return notFound();

  return {
    title: result.NOME,
    description: result.DESCRICAO,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: result.NOME,
      description: result.DESCRICAO,
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_API_PROD +
            "produtos/" +
            result.IMAGENS[0].url,
          width: 800,
          height: 600,
          alt: result.NOME,
        },
      ],
    },
  };
}

export default async function ProdutoDetalhe({ params }: Props) {
  const { result, similares, quantidade } = await getProduct(params.produto_id);

  if (!result) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: result.NOME,

    image:
      process.env.NEXT_PUBLIC_API_PROD + "produtos/" + result.IMAGENS[0].url,
    description: result.DESCRICAO,
    offers: {
      "@type": "AggregateOffer",
      price: result.PRECO,
      priceCurrency: "BRL",
      availability:
        result.STATUS == "1"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div>
        <Suspense fallback={<SkeletonGalery />}>
          <Gallery
            images={result.IMAGENS.map((image: Image) => ({
              url: "produtos/" + image.url,
              altText: image.altText,
            }))}
          />
        </Suspense>
      </div>
      <ProductDetails item={result} />
      {quantidade > 0 && <ProductSimilars item={similares} />}
      <SendThisProductForWhats item={result} />
    </main>
  );
}
