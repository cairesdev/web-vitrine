import styles from "@/styles/loader.module.css";

export default async function Loading() {
  return (
    <picture className={styles.loader_container}>
      <source
        srcSet="/icon.svg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        type="image/svg"
      />
      <img
        className={styles.icon__pulse}
        src="/icon.svg"
        alt="Loading..."
        loading="lazy"
        title="Pocurando ofertas"
      />
      Procurando ofertas...
    </picture>
  );
}
