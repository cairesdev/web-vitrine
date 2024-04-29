import { getProduct } from "@/hooks/useProdutos";
import Image from "next/image";
import styles from "@/styles/produto.module.css";
import "@/styles/butons.css";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

interface Props {
  params: {
    produto_id: string;
  };
}

export default async function VisualizarProdutoPage({ params }: Props) {
  const { result } = await getProduct(params.produto_id);

  return (
    <div className={styles.box__show_produto}>
      <div className={styles.header__product}>
        <Link href={"/admin/lista-produtos"}>
          <FaAngleLeft />
        </Link>
      </div>
      <Image
        src={`http://localhost:4000/produtos/${result.IMAGEM}`}
        alt={result.NOME}
        priority
        width={350}
        height={350}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className={styles.container__desc_produto}>
        <h2>{result.NOME}</h2>
        <p>Categoria: {result.CATEGORIA}</p>
        <br />
        <hr />
        <br />
        <h3>Descrição</h3>
        <p>{result.DESCRICAO}</p>
      </div>
      <div className={styles.sub_buttons_product}>
        <Link
          className="btn_blue_no_fill"
          href={`/admin/editar/${params.produto_id}`}
        >
          Compartilhar
        </Link>
        <Link
          className="btn_blue_two"
          href={`/admin/editar/${params.produto_id}`}
        >
          Editar
        </Link>
      </div>
    </div>
  );
}
