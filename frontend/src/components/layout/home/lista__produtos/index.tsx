import { getProducts, getProductByCategoria } from "@/hooks/useProdutos";
import ItemProduto from "./item__produto";
import styles from "@/styles/public/produto.module.css";
import Link from "next/link";

export default async function ListaProdutosHome() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const { results } = await getProducts();

  return (
    <main className={styles.home__produtos}>
      <section>
        <h3 className={styles.titulo__secao__lista}>Todos os Produtos</h3>
        <div className={styles.container__itens_horizontal}>
          {results &&
            results.map((item) => <ItemProduto key={item._id} item={item} />)}
        </div>
      </section>
    </main>
  );
}

export async function ListByCategory({ categoria }: { categoria: string }) {
  const { results } = await getProductByCategoria({ categoria });

  return (
    <main className={styles.home__produtos}>
      <section>
        <h3 className={styles.titulo__secao__lista}>{categoria}</h3>
        <div className={styles.container__itens}>
          {results &&
            results.map((item) => <ItemProduto key={item._id} item={item} />)}
        </div>
      </section>
      <div className="btn_center">
        <Link
          className="blue__two_fill"
          href={`/produto?collection=${categoria}`}
        >
          Clique aqui!
        </Link>
      </div>
    </main>
  );
}
