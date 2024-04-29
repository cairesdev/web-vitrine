"use client";
import { useRouter } from "next/navigation";
import "@/styles/butons.css";
import { FaAngleLeft } from "react-icons/fa6";

interface Props {
  className?: string;
  rota?: boolean;
  action: "voltar" | "ir_para" | "recarregar";
}

export default function Button({ className, rota, action }: Props) {
  const router = useRouter();

  function handleButton() {
    switch (action) {
      case "ir_para":
        router.push(`${rota}`);
        break;
      case "voltar":
        router.back();
        break;
      case "recarregar":
        router.refresh();
        break;
      default:
        break;
    }
  }

  return (
    <button className={className} onClick={handleButton} type="button">
      {action === "ir_para" ? (
        "Mais detalhes"
      ) : action === "voltar" ? (
        <FaAngleLeft />
      ) : (
        "Recarregar página"
      )}
    </button>
  );
}
