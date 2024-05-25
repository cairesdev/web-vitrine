"use client";
import { Banner } from "@/types/banner";
import styles from "@/styles/public/banner.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BannerItem({ item }: { item: Banner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (item.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % item.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [item]);

  if (item.length === 0) return null;

  return (
    <section>
      {item.map((banner, index) => (
        <div
          key={index}
          className={`${
            index === currentIndex
              ? styles.container__item_banner
              : styles.container__item_off
          }`}
        >
          <Link href={banner.URL}></Link>
          <Image
            alt={banner.NOME}
            src={
              process.env.NEXT_PUBLIC_API_PROD + "banner_image/" + banner.IMAGEM
            }
            quality={100}
            fill
          />
        </div>
      ))}
    </section>
  );
}

export function BannerSkeleton() {
  return (
    <div className={styles.container__item_skeleton}>
      <div className={styles.skeleton}>Carregando...</div>
    </div>
  );
}
