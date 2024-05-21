import SearchProduct, { SearchSkeleton } from "@/components/layout/search";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="main__public">
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
        <div className="img__container">
          <Image src="/icon.svg" alt="Logo" width={30} height={30} />
          <Image src="/cairesdev.svg" alt="cairesdev" width={30} height={30} />
        </div>
        <b>KS Variedades &copy; {new Date().getFullYear()}</b>
        <span>
          Feito por{" "}
          <Link target="_blank" href={"https://instagram.com/cairesdev"}>
            @cairesdev
          </Link>
        </span>
      </footer>
    </main>
  );
}
