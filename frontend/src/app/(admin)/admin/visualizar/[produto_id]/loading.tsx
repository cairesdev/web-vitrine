import styles from "@/styles/loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
      <h2 className={styles.loader_text}>
        Aguarde um momento, estamos solicitando os dados no servidor
      </h2>
    </div>
  );
}
