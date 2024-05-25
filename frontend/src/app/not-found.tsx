"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import _404 from "@/assets/images/404.svg";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        height: "100vh",
      }}
    >
      <Image
        src={_404}
        alt="404"
        quality={100}
        priority={true}
        width={300}
        height={300}
      />
      <p
        style={{
          fontSize: "1rem",
          fontWeight: "normal",
          color: "#333",
          textAlign: "center",
        }}
      >
        Não conseguimos encontrar a página que você está procurando,
        redirecionaremos você para a página inicial.
      </p>
    </div>
  );
}
