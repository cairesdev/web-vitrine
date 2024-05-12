import React from "react";
import ItemProduto from "@/components/layout/home/lista__produtos/item__produto";
import { getProducts } from "@/hooks/useProdutos";
import styles from "@/styles/public/produto.module.css";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getProducts();
  const { q: searchValue, collection } = searchParams as {
    [key: string]: string;
  };

  let filteredResults = results;

  if (searchValue) {
    filteredResults = filteredResults.filter((item) =>
      item.NOME.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  if (collection) {
    filteredResults = filteredResults.filter((item) =>
      item.CATEGORIA.toLowerCase().includes(collection.toLowerCase())
    );
  }

  return (
    <div>
      <main className={styles.home__produtos}>
        <section>
          <h3 className={styles.titulo__secao__lista}>
            Buscando por: {searchValue ? searchValue : collection}
          </h3>
          <p>Resultados encontrados: {filteredResults.length}</p>
          <div className={styles.container__itens_horizontal}>
            {filteredResults &&
              filteredResults.map((item) => (
                <ItemProduto key={item._id} item={item} />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
