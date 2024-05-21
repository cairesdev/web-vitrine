import { Product } from "@/types/product";
import styles from "@/styles/public/product.module.css";

export default async function ProductDetails({ item }: { item: Product }) {
  return (
    <div className={styles.container__description}>
      <h2>{item.NOME}</h2>
      <p>{item.CATEGORIA}</p>
      <h3>R$ {item.PRECO}</h3>
      <div className="separator__10" />
      <b>Descrição</b>
      <p>{item.DESCRICAO}</p>
      <div className="separator__10" />
      <b>Tags</b>
      <div className={styles.container__tags}>
        {item.tags.length > 1 &&
          item.tags.map((tag, index) => <p key={index}>{tag}</p>)}
      </div>
    </div>
  );
}
