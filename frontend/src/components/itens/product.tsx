import { IProduct } from "@/models/products";
import Image from "next/image";
import React from "react";

export default function ItemProdutoADM({
  item,
  children,
}: {
  item: IProduct;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>{item.NOME}</h2>
      <p>{item.DESCRICAO}</p>
      <p>{item.CATEGORIA}</p>
      <Image
        src={`http://localhost:4000/produtos/${item.IMAGEM}`}
        alt={item.NOME}
        width={50}
        height={50}
      />
      {children}
    </div>
  );
}
