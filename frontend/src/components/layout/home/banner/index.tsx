"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/public/banner.module.css";
import Link from "next/link";

const banners = [
  {
    id: 1,
    image: "/BANNER_01.png",
    name: "Moda Feminina",
    destak: "coleção",
    link: "Moda Feminina",
  },
  {
    id: 2,
    image: "/BANNER_02.png",
    name: "",
    destak: "Cosméticos",
    link: "Cosméticos",
  },
] as const;

export default function Banner() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={styles.container__banners}>
      <div className={styles.box__banners}>
        <div
          className={styles.banner}
          style={{ background: `url(${banners[currentBannerIndex].image})` }}
        >
          <b>{banners[currentBannerIndex].name}</b>
          <p>{banners[currentBannerIndex].destak}</p>
          <Link
            href={`/produto?collection=${banners[currentBannerIndex].link}`}
          ></Link>
        </div>
      </div>
    </section>
  );
}
