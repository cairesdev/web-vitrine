import { defaultSort, sorting } from "@/constants/sort";
import { getProducts } from "@/lib/backend/product";

export const metadata = {
  title: "Pesquisar",
  description: "Procure por produtos na loja",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const response = await getProducts({
    sortKey: sort,
    reverse: false,
  });
  console.log(response);

  return (
    <main>
      <div>
        <h2>Pagina teste</h2>
      </div>
    </main>
  );
}
