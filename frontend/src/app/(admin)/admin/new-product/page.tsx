"use client";
import styles from "@/styles/admin/form.module.css";
import { useState } from "react";
import { useCreateProduct } from "@/hooks/useProdutos";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";

export default function CreateProdutoPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    IMAGEM: null,
    NOME: "",
    DESCRICAO: "",
    CATEGORIA: "",
    STATUS: 1,
  });

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
    await useCreateProduct(formValues);
    router.push("/admin");
  };

  return (
    <div>
      <header>
        <h1>Cadastrar Produto</h1>
        <Link href={"/admin"}>
          <IoExitOutline size={20} color="#FF424F" />
        </Link>
      </header>

      <br />
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          {!formValues.IMAGEM && (
            <input
              className={styles.form_file_input}
              type="file"
              name="IMAGEM"
              accept="image/*"
              onChange={handleChange}
              multiple={false}
            />
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
                className={styles.remove_button}
                onClick={handleRemoveImage}
              >
                Remover Imagem
              </button>
            </div>
          )}
          <input
            className={styles.form_input}
            type="text"
            name="NOME"
            value={formValues.NOME}
            onChange={handleChange}
            placeholder="Nome do produto"
          />
          <input
            className={styles.form_input}
            type="text"
            name="CATEGORIA"
            value={formValues.CATEGORIA}
            onChange={handleChange}
            placeholder="Categoria do produto"
          />
          <textarea
            className={styles.form_input}
            name="DESCRICAO"
            value={formValues.DESCRICAO}
            onChange={handleChange}
            placeholder="Descrição do produto"
          />
          <div className={styles.box__buttons}>
            <button className={styles.form_button} type="submit">
              Cadastrar
            </button>
            <Link href={"/admin"} className={styles.btn_blue_no_fill}>
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
