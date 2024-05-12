import { IProduct } from "@/models/responses";
import Image from "next/image";
import styles from "@/styles/public/produto.module.css";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { HandleCopy } from "./client-itens";

export default function Produto({ item }: { item: IProduct }) {
  return (
    <main className={styles.detalhe__container}>
      <Image
        src={process.env.NEXT_PUBLIC_API_PROD + "produtos/" + item.IMAGEM}
        alt={item.NOME}
        loading="lazy"
        crossOrigin="anonymous"
        fetchPriority="high"
        width={300}
        height={300}
      />
      <div className={styles.box__outros_links}>
        <Link href={`/produto?collection=${item.CATEGORIA}`}>
          Ver Similares
        </Link>
        <HandleCopy item={item} />
      </div>
      <div className={styles.detalhes}>
        <h2>{item.NOME}</h2>
        <b>
          <span>Coleção: </span>
          {item.CATEGORIA}
        </b>
        <br />
        <br />
        <p>{item.DESCRICAO}</p>
      </div>

      <Link
        target="_blank"
        href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&text=${process.env.NEXT_PUBLIC_DNS}produto/${item._id}`}
        className={styles.more__about}
      >
        Saiba mais pelo WhatsApp <BsWhatsapp />
      </Link>
    </main>
  );
}
