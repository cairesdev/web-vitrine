"use client";
import styles from "@/styles/admin/form.module.css";
import { useEffect, useState } from "react";
import { CreateProduct } from "@/hooks/useProdutos";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";
import { getCategorias } from "@/hooks/useCategorias";
import { ICategoria } from "@/models/responses";

export default function CreateProdutoPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    IMAGEM: null,
    NOME: "",
    DESCRICAO: "",
    CATEGORIA: "",
    STATUS: 1,
  });

  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  useEffect(() => {
    async function fetchCategorias() {
      const { results } = await getCategorias();
      setCategorias(results);
    }
    fetchCategorias();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "IMAGEM" ? files[0] : value,
    });
  };

  const handleRemoveImage = () => {
    setFormValues({
      ...formValues,
      IMAGEM: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await CreateProduct(formValues);
    router.push("/admin");
    router.refresh();
  };

  return (
    <div>
      <header>
        <h1>Cadastrar Produto</h1>
        <Link href={"/admin"}>
          <IoExitOutline size={20} color="#FF424F" />
        </Link>
      </header>
      <div>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          {!formValues.IMAGEM && (
            <label htmlFor="imagemInput" className="green__button">
              Selecionar Imagem
              <input
                id="imagemInput"
                className={styles.form_file_input}
                type="file"
                name="IMAGEM"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
                multiple={false}
              />
            </label>
          )}
          {formValues.IMAGEM && (
            <div className={styles.image_container}>
              <Image
                className={styles.form_image}
                src={URL.createObjectURL(formValues.IMAGEM)}
                alt="Imagem do produto"
                width={320}
                height={320}
              />
              <button
                type="button"
                className="red__button"
                onClick={handleRemoveImage}
              >
                Remover Imagem
              </button>
            </div>
          )}
          <div className="separator__10"></div>
          <input
            className={styles.form_input}
            type="text"
            name="NOME"
            value={formValues.NOME}
            onChange={handleChange}
            placeholder="Nome do produto"
          />
          <select
            className={styles.form_input}
            value={formValues.CATEGORIA}
            onChange={handleChange}
            name="CATEGORIA"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria.NOME}>
                {categoria.NOME}
              </option>
            ))}
          </select>
          <textarea
            className={styles.form_input}
            name="DESCRICAO"
            value={formValues.DESCRICAO}
            onChange={handleChange}
            placeholder="Descrição do produto"
          />
          <div className={styles.box__buttons}>
            <button className="blue__two_fill" type="submit">
              Cadastrar
            </button>
            <Link href={"/admin"} className="blue__no_fill">
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
