import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        <h1>
          <Image src="/logomarca.svg" alt="Logo" width={16} height={16} />
          {"  "}
          KS Variedades
        </h1>
      </header>
    </div>
  );
}
