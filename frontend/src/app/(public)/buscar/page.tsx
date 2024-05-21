import React from "react";
import styles from "@/styles/public/produto.module.css";
import { getAllProduct } from "@/lib/backend/product";
import ItemProduto from "@/components/product/card";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { result } = await getAllProduct();
  const { q: searchValue, collection } = searchParams as {
    [key: string]: string;
  };

  let filteredResults = result;

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
