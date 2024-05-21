import { ProductSimilar } from "@/types/product";
import styles from "@/styles/public/product.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function ProductSimilars({
  item,
}: {
  item: ProductSimilar[];
}) {
  return (
    <div className={styles.container__similares}>
      <h2>Clientes Também Visitaram</h2>
      <div className="separator__10" />
      <div className="separator__10" />
      <div className={styles.box__similares__items}>
        {item.map((item) => (
          <div className={styles.similar__item} key={item._id}>
            <Link
              href={"/produto/" + item._id}
              className={styles.container__image_similar}
            >
              <Image
                alt={item.IMAGENS[0].altText}
                src={
                  process.env.NEXT_PUBLIC_API_PROD +
                  "produtos/" +
                  item.IMAGENS[0].url
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
        ))}
      </div>
    </div>
  );
}
