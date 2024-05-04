import ListaProdutosHome, {
  ListByCategory,
} from "@/components/layout/home/lista__produtos";
import LoaderProduto from "@/components/layout/home/lista__produtos/skeleton";

import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoaderProduto />}>
        <ListByCategory categoria="Moda Feminina" />
      </Suspense>

      <Suspense fallback={<LoaderProduto />}>
        <ListByCategory categoria="Sapatos e Calçados" />
      </Suspense>

      <Suspense fallback={<LoaderProduto />}>
        <ListaProdutosHome />
      </Suspense>
    </main>
  );
}
