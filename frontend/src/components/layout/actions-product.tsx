"use client";
import { deleteProduct } from "@/hooks/useProdutos";
import { useRouter } from "next/navigation";

export function DeletarButton({ id, image }: { id: string; image: string }) {
  const router = useRouter();

  async function onHancleClick() {
    router.refresh();
    await deleteProduct(id, image);
  }

  return (
    <button className="red__button" onClick={onHancleClick} type="button">
      Excluir
    </button>
  );
}
