import { ICategoria } from "@/models/responses";
import Image from "next/image";
import React from "react";
import styles from "@/styles/produto.module.css";

export default function ItemCategoriaADM({ item }: { item: ICategoria }) {
  return (
    <div className={styles.box__categoria_admin}>
      <Image
        src={`http://localhost:4000/categoria/${item.IMAGEM}`}
        alt={item.NOME}
        width={40}
        height={40}
      />
      <div className={styles.box__desc_iten}>
        <h2>{item.NOME}</h2>
      </div>
    </div>
  );
}
