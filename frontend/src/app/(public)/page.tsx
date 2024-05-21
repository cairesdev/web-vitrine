import Banner from "@/components/layout/home/banner";
import ListaProdutosHome from "@/components/layout/home";
import { SkeletonListProduct } from "@/components/product/card";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Banner />
      <br />
      <br />
      <Suspense fallback={<SkeletonListProduct />}>
        <ListaProdutosHome />
      </Suspense>
    </main>
  );
}
