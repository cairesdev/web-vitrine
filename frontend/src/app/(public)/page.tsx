import ListaProdutosHome from "@/components/layout/home/lista__produtos";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header>
        <Link href={"/"}>
          <Image src="/icon.svg" alt="Logo" width={46} height={40} />
        </Link>
      </header>
      <ListaProdutosHome />
    </main>
  );
}
