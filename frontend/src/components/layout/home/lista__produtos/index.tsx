import { getProducts, getProductByCategoria } from "@/hooks/useProdutos";
import { Suspense } from "react";
import ItemProduto from "./item__produto";
import styles from "@/styles/public/produto.module.css";
import LoaderProduto from "../../loader_produto";

export default async function ListaProdutosHome() {
  const { results, quantidade } = await getProducts();
  const { results: cat_feminina, quantidade: quantidade_cat_feminina } =
    await getProductByCategoria({
      categoria: "Moda Feminina",
    });
  const { results: cat_sapatos, quantidade: quantidade_sapatos } =
    await getProductByCategoria({
      categoria: "Sapatos e Calçados",
    });

  return (
    <Suspense fallback={<LoaderProduto />}>
      <main className={styles.home__produtos}>
        <section>
          <h3 className={styles.titulo__secao__lista}>Moda Feminina</h3>
          {/* <p>Produtos encontrados: {quantidade_cat_feminina}</p> */}
          <div className={styles.container__itens}>
            {cat_feminina &&
              cat_feminina.map((item) => (
                <ItemProduto key={item._id} item={item} />
              ))}
          </div>
        </section>
        <br />
        <section>
          <h3 className={styles.titulo__secao__lista}>Sapatos e Calçados</h3>
          {/* <p>Produtos encontrados: {quantidade_sapatos}</p> */}
          <div className={styles.container__itens}>
            {cat_sapatos &&
              cat_sapatos.map((item) => (
                <ItemProduto key={item._id} item={item} />
              ))}
          </div>
        </section>
        <br />
        <section>
          <h3 className={styles.titulo__secao__lista}>Todos os Produtos</h3>
          {/* <p>Produtos encontrados: {quantidade}</p> */}
          <div className={styles.container__itens}>
            {results &&
              results.map((item) => <ItemProduto key={item._id} item={item} />)}
          </div>
        </section>
      </main>
    </Suspense>
  );
}
