import styles from "@/styles/public/item.module.css";
import { getAllProduct } from "@/lib/backend/product";
import ItemProduto from "@/components/product/card";
import Link from "next/link";
import { Limit } from "@/constants";

export default async function ListAllProdutos() {
  let limit = Limit.RECOMENDACOES;
  const { result } = await getAllProduct({ limit });

  return (
    <main className={styles.container__list_all}>
      <section>
        <h2 className={styles.titulo__secao__lista}>Recomendados</h2>

        <div className={styles.container__itens}>
          {result &&
            result.map((item) => <ItemProduto key={item._id} item={item} />)}
        </div>
      </section>
      <div className={styles.button__center}>
        <Link className="blue__two_fill" href={"/produtos?limit=16"}>
          Ver mais
        </Link>
      </div>
    </main>
  );
}
