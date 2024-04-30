"use client";
import { useState } from "react";
import "@/styles/containers.css";
import { useCreateProduct } from "@/hooks/useProdutos";
import { useRouter } from "next/navigation";

export default function CreateProdutoPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    IMAGEM: null,
    NOME: "",
    DESCRICAO: "",
    CATEGORIA: "",
    STATUS: 0,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "IMAGEM" ? files[0] : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await useCreateProduct(formValues);
    router.push("/admin/lista-produtos");
  };

  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="IMAGEM"
          accept="image/*"
          onChange={handleChange}
        />
        <input
          type="text"
          name="NOME"
          value={formValues.NOME}
          onChange={handleChange}
          placeholder="Nome do produto"
        />
        <input
          type="text"
          name="DESCRICAO"
          value={formValues.DESCRICAO}
          onChange={handleChange}
          placeholder="Descrição do produto"
        />
        <input
          type="text"
          name="CATEGORIA"
          value={formValues.CATEGORIA}
          onChange={handleChange}
          placeholder="Categoria do produto"
        />
        <input
          type="number"
          name="STATUS"
          value={formValues.STATUS}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
