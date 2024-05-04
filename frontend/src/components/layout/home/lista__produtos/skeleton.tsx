import styles from "@/styles/loader.module.css";

export default function LoaderProduto() {
  return (
    <div className={styles.loader_produto_container}>
      <div className={styles.item__titulo_secao}></div>
      <ul className={styles.container__produto}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
