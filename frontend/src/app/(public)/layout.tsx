import Image from "next/image";
import Link from "next/link";
import SearchProduct, {
  SearchSkeleton,
} from "@/components/inputs/search_products";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <header>
        <Link href={"/"}>
          <Image src="/icon.svg" alt="Logo" width={46} height={40} />
        </Link>
        <Suspense fallback={<SearchSkeleton />}>
          <SearchProduct />
        </Suspense>
      </header>
      {children}
      <footer>
        KS Variedades &copy; {new Date().getFullYear()} - Todos os direitos
        reservados
      </footer>
    </main>
  );
}
