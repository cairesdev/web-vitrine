import styles from "@/styles/loader.module.css";

export default function LoaderProduto() {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
      <h2 className={styles.loader_text}>Aguarde um momento...</h2>
    </div>
  );
}
