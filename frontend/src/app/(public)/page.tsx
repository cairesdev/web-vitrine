import { BannerSkeleton } from "@/components/banner/card";
import CarrouselBanner from "@/components/layout/carrousel_banner";
import ListAllProdutos from "@/components/layout/list_all_products";
import { SkeletonListProduct } from "@/components/product/card";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<BannerSkeleton />}>
        <CarrouselBanner />
      </Suspense>
      <Suspense fallback={<SkeletonListProduct />}>
        <ListAllProdutos />
      </Suspense>
    </main>
  );
}
