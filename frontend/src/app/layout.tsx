import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ensureStartsWith } from "@/utils/utils";
const inter = Inter({ subsets: ["latin"] });

const { SITE_NAME, INSTA_CREATOR, INSTA_SITE } = process.env;

const instagramCreator = INSTA_CREATOR
  ? ensureStartsWith(INSTA_CREATOR, "@")
  : undefined;
const instagramSite = INSTA_SITE
  ? ensureStartsWith(INSTA_SITE, "https://")
  : undefined;

const baseUrl = process.env.NEXT_PUBLIC_DNS
  ? `https://${process.env.NEXT_PUBLIC_DNS}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: "%s | " + SITE_NAME!,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(instagramCreator &&
    instagramSite && {
      twitter: {
        card: "summary_large_image",
        creator: instagramCreator,
        site: instagramSite,
      },
    }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1Z4N6RFL4T"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1Z4N6RFL4T');
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
