import { IProduct } from "@/models/responses";
import Image from "next/image";
import styles from "@/styles/public/produto.module.css";

export default function ItemProduto({ item }: { item: IProduct }) {
  return (
    <div className={styles.item__produto}>
      <Image
        src={process.env.NEXT_PUBLIC_API_PROD + "produtos/" + item.IMAGEM}
        alt={item.NOME}
        width={160}
        height={200}
        loading="lazy"
        crossOrigin="anonymous"
        fetchPriority="high"
      />
      <div className={styles.box__detalhes}>
        <b>{item.NOME}</b>
        <p>{item.CATEGORIA}</p>
      </div>
    </div>
  );
}
