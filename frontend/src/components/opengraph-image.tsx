import { ImageResponse } from "next/og";
import LogoIcon from "@/assets/images/icon";

export type Props = {
  title?: string;
};

export default async function OpenGraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = { ...{ title: process.env.SITE_NAME }, ...props };
  return new ImageResponse(
    (
      <div>
        <div>
          <LogoIcon />
        </div>
        <p>{title}</p>
      </div>
    ),
    {
      width: 500,
      height: 500,
      fonts: [
        {
          name: "Inter",
          data: await fetch(
            new URL("../assets/fonts/Inter-Bold.ttf", import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
