import styles from "@/styles/public/produto.module.css";
import { getAllProduct } from "@/lib/backend/product";
import ItemProduto from "@/components/product/card";

export default async function ListaProdutosHome() {
  const { result } = await getAllProduct();

  return (
    <main className={styles.home__produtos}>
      <section>
        <h3 className={styles.titulo__secao__lista}>Todos os Produtos</h3>
        <div className={styles.container__itens_horizontal}>
          {result &&
            result.map((item) => <ItemProduto key={item._id} item={item} />)}
        </div>
      </section>
    </main>
  );
}
