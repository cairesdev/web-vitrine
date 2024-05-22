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
    title: result.SEO.title,
    description: result.SEO.description,
    keywords: result.SEO.keywords,
    authors: {
      name: process.env.SITE_NAME,
      url: process.env.INSTA_SITE,
    },
    alternates: {
      canonical: process.env.INSTA_SITE + "/produtos/" + result._id,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: result.SEO.title,
      description: result.SEO.description,
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_API_PROD +
            "produtos/" +
            result.IMAGENS[0].url,
          width: 500,
          height: 500,
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
    description: result.SEO.description,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: result.PRECO,
      priceCurrency: "BRL",
      url: process.env.INSTA_SITE + "produtos/" + result._id,
    },
    sku: "001",
    brand: {
      "@type": "Brand",
      name: process.env.SITE_NAME,
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingLabel: "Entrega Normal",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingLabel: "Entrega Agendada",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "BR",
      },
    },
    seller: { "@type": "Organization", name: process.env.SITE_NAME },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "316",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: 5,
        },
        author: { "@type": "Person", name: "João" },
        reviewBody: "Muito bom. Atende minhas espectativas.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: 5,
        },
        author: { "@type": "Person", name: "Kesia" },
        reviewBody: "Roupa muito bonita e excelente!",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: 5,
        },
        author: { "@type": "Person", name: "Ana Luiza" },
        reviewBody: "Muito bonito o tecido, me atende bem.",
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        id="schemaLdJson"
        data-ncript="afterInteractive"
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
