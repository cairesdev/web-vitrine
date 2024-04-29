"use client";
import { IProduct } from "@/models/products";
import { deleteProduct } from "@/hooks/useProdutos";
import { useRouter } from "next/navigation";
import "@/styles/butons.css";

interface Props {
  className?: string;
  disabled?: boolean;
  action: "excluir" | "editar" | "visualizar";
  data: IProduct;
}

export default function Button({ className, disabled, action, data }: Props) {
  const router = useRouter();

  function handleButton() {
    switch (action) {
      case "visualizar":
        router.push(`/admin/visualizar/${data._id}`);
        break;
      case "editar":
        router.push(`/admin/editar/${data._id}`);
        break;
      case "excluir":
        router.refresh();
        deleteProduct(data._id, data.IMAGEM);
        break;
      default:
        break;
    }
  }

  return (
    <button
      className={className}
      onClick={handleButton}
      disabled={disabled}
      type="button"
    >
      {action === "visualizar"
        ? "Visualizar"
        : action === "editar"
        ? "Editar"
        : "Excluir"}
    </button>
  );
}
