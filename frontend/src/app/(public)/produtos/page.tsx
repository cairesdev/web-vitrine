import React from "react";
import styles from "@/styles/public/item.module.css";
import { getAllProductByFilters } from "@/lib/backend/product";
import ItemProduto from "@/components/product/card";
import Link from "next/link";

export const metadata = {
  title: "Produtos",
  description: "Procure pelos produtos na loja.",
};

export default async function Produtos({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue, limit } = searchParams as {
    [key: string]: string;
  };

  let length_limit = limit ? JSON.parse(limit) : 10;

  const { result, total } = await getAllProductByFilters({
    limit: length_limit,
    query: searchValue,
  });

  return (
    <main className={styles.container__list_all}>
      <h2 className={styles.titulo__secao__lista}>
        Procure o que você precisa
      </h2>
      <p>&quot;{total}&quot;</p>
      <section>
        <div className={styles.container__itens}>
          {total > 0 &&
            result.map((item) => <ItemProduto key={item._id} item={item} />)}
        </div>
      </section>
      <div className={styles.button__center}>
        <Link
          className="blue__two_fill"
          href={`/produtos?limit=${JSON.parse(length_limit) + 6}${
            searchValue ? `&q=${searchValue}` : ""
          }`}
          scroll={false}
        >
          Ver mais
        </Link>
        <Link
          className="blue__no_fill"
          href={`/produtos?limit=${JSON.parse(length_limit) - 6}${
            searchValue ? `&q=${searchValue}` : ""
          }`}
          scroll={false}
        >
          Ver menos
        </Link>
      </div>
    </main>
  );
}
