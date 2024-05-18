import type { Metadata } from "next";
import "./globals.css";
import { ensureStartsWith } from "@/utils/utils";

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
  description: "Melhor site de moda da região!",
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
  openGraph: {
    type: "website",
    locale: "pt-BR",
    url: baseUrl,
    siteName: SITE_NAME!,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
