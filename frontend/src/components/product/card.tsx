import styleLoader from "@/styles/loader.module.css";
import Image from "next/image";
import styles from "@/styles/public/item.module.css";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ItemProduto({ item }: { item: Product }) {
  return (
    <div className={styles.card__container}>
      <Link
        href={"/produtos/" + item._id}
        rel="noopener noreferrer"
        className={styles.link__image_card}
      >
        <Image
          alt={item.IMAGENS[0].altText}
          src={
            process.env.NEXT_PUBLIC_API_PROD + "produtos/" + item.IMAGENS[0].url
          }
          fill
          priority
          sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
        />
      </Link>
      <div className={styles.desc__item}>
        <b>R$ {item.PRECO}</b>
        <p>{item.NOME}</p>
      </div>
    </div>
  );
}

export function SkeletonListProduct() {
  return (
    <div className={styleLoader.loader_produto_container}>
      <div className={styleLoader.item__titulo_secao}></div>
      <ul className={styleLoader.container__produto}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
