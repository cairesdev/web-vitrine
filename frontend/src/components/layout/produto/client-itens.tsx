"use client";

import { IProduct } from "@/models/responses";
import { useCallback } from "react";
import { FiShare2 } from "react-icons/fi";

export function HandleCopy({ item }: { item: IProduct }) {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_DNS + "produto/" + item._id
    );
  }, [item.NOME]);
  return (
    <p onClick={handleCopy} title="Copiar link">
      Copiar link para compartilhar <FiShare2 />
    </p>
  );
}
