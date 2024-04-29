import { IProduct } from "@/models/products";
import Image from "next/image";
import React from "react";
import styles from "@/styles/produto.module.css";

export default function ItemProdutoADM({
  item,
  children,
}: {
  item: IProduct;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.box__produto_admin}>
      <Image
        src={`http://localhost:4000/produtos/${item.IMAGEM}`}
        alt={item.NOME}
        width={80}
        height={80}
      />
      <div className={styles.box__desc_iten}>
        <h2>{item.NOME}</h2>
        <p>{item.CATEGORIA}</p>
        <div className={styles.box__buttons_admin}>{children}</div>
      </div>
    </div>
  );
}
