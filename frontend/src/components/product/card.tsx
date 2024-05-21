import styleLoader from "@/styles/loader.module.css";
import Image from "next/image";
import styles from "@/styles/public/product.module.css";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ItemProduto({ item }: { item: Product }) {
  return (
    <div className={styles.similar__item} key={item._id}>
      <Link
        href={"/produto/" + item._id}
        className={styles.container__image_similar}
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
          className={styles.image_similar}
        />
      </Link>
      <div className={styles.desc__similars}>
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
