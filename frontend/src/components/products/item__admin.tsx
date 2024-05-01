import { IProduct } from "@/models/responses";
import Image from "next/image";
import React, { Suspense } from "react";
import styles from "@/styles/admin/product.module.css";
import { DeletarButton } from "../layout/actions-product";
import Link from "next/link";

export default function ItemProductADM({ item }: { item: IProduct }) {
  return (
    <div className={styles.box__item}>
      <Image
        src={`http://localhost:4000/produtos/${item.IMAGEM}`}
        alt={item.NOME}
        width={80}
        height={80}
        className={styles.image__produto}
        priority={true}
        sizes="(min-width: 320px) 66vw"
      />
      <div>
        <h2 className={styles.item__title}>{item.NOME}</h2>
        <p>{item.CATEGORIA}</p>
        <div className={styles.box__butons}>
          <Suspense fallback={null}>
            <Link href={"/"} className="blue__button">
              Visualizar
            </Link>
            <Link href={"/"} className="yelow__button">
              Editar
            </Link>
            <DeletarButton id={item._id} image={item.IMAGEM} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
