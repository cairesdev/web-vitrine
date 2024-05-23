import { Product } from "@/types/product";
import Link from "next/link";
import styles from "@/styles/public/product.module.css";

export default function SendThisProductForWhats({ item }: { item: Product }) {
  return (
    <div className={styles.box__send_this_product}>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&text=${process.env.NEXT_PUBLIC_DNS}produto/${item._id} *${item.NOME}* *${item.CATEGORIA}*`}
      >
        Quero este!
      </Link>
    </div>
  );
}
