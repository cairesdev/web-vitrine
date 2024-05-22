"use client";
import { createUrl } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PiCaretCircleLeftFill, PiCaretCircleRightFill } from "react-icons/pi";
import styles from "@/styles/public/product.module.css";

export function Gallery({
  images,
}: {
  images: { url: string; altText: string }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get("image");
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set("image", nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set("image", previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  return (
    <section className={styles.images__container}>
      <div className={styles.image_base_container}>
        {images[imageIndex] && (
          <Image
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt={images[imageIndex]?.altText as string}
            src={
              (process.env.NEXT_PUBLIC_API_PROD +
                images[imageIndex]?.url) as string
            }
            priority={true}
            className={styles.image_base}
          />
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.arrows_container}>
          <Link href={previousUrl}>
            <PiCaretCircleLeftFill />
          </Link>
          <Link href={nextUrl}>
            <PiCaretCircleRightFill />
          </Link>
        </div>
      )}
    </section>
  );
}

export function SkeletonGalery() {
  return (
    <div className={styles.images__container}>
      <div className={styles.image_base_container_skeleton}></div>
    </div>
  );
}
