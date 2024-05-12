import Produto from "@/components/layout/produto";
import { HIDDEN_PRODUCT_TAG } from "@/constants";
import { getProduct } from "@/hooks/useProdutos";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { result } = await getProduct(params.produto_id);

  if (!result) notFound();

  const indexable = !result.NOME.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: result.NOME,
    description: result.DESCRICAO + result.CATEGORIA,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph:
      process.env.NEXT_PUBLIC_API_PROD + "produto/" + result.IMAGEM
        ? {
            images: [
              {
                url:
                  process.env.NEXT_PUBLIC_API_PROD + "produto/" + result.IMAGEM,
                width: 500,
                height: 500,
                alt: result.NOME,
              },
            ],
          }
        : null,
  };
}

interface Props {
  params: {
    produto_id: string;
  };
}

export default async function ProdutoDetalhe({ params }: Props) {
  const { result } = await getProduct(params.produto_id);
  if (!result) return <p>Produto não encontrado</p>;

  return (
    <main>
      <Produto item={result} />
    </main>
  );
}
