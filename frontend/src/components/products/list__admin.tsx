import { getProducts } from "@/hooks/useProdutos";
import ItemProductADM from "./item__admin";
import { Suspense } from "react";
import Search, { SearchSkeleton } from "../inputs/search";
import Link from "next/link";

export default async function ListProductsADM({
  searchTerm,
}: {
  searchTerm?: string;
}) {
  const { results } = await getProducts();

  // Filtro de busca
  let data = searchTerm
    ? results.filter((item) =>
        item.NOME.toLowerCase().includes(searchTerm?.toLowerCase() || "")
      )
    : results;

  return (
    <div className="container__section_admin">
      <nav className="fixed__nav_header">
        <h2 className="titulo_sessao">Produtos</h2>
        <div>
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <Link href={"/admin/new-product"} className="green__button">
            Criar Novo
          </Link>
        </div>
      </nav>
      {results &&
        data.map((item) => <ItemProductADM item={item} key={item._id} />)}
    </div>
  );
}
