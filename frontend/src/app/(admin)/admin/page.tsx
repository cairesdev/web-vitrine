import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";
import prodStyle from "@/styles/admin/product.module.css";
import ListProductsADM from "@/components/products/list__admin";

export default async function HomeADM({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as { [key: string]: string };

  return (
    <main>
      <header>
        <h1>Area Administrativa</h1>
        <Link href={"/"}>
          <IoExitOutline size={20} color="#FF424F" />
        </Link>
      </header>
      <div className="separator__10"></div>
      <section className={prodStyle.product__list}>
        <ListProductsADM searchTerm={searchValue} />
      </section>
    </main>
  );
}
