import type { Metadata } from "next";
import "./globals.css";

const { SITE_NAME, NEXT_PUBLIC_DNS, NEXT_PUBLIC_API_PROD } = process.env;

const baseUrl = NEXT_PUBLIC_DNS as string;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: "%s | " + SITE_NAME!,
  },
  description: "Aqui você encontra as melhores promoções!",
  keywords: ["moda", "moda feminina", "maranhao", "site de roupas"],
  authors: [{ name: "João Caires", url: "instagram.com/cairesdev" }],
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href={NEXT_PUBLIC_API_PROD} />
        <link rel="canonical" href="https://ksvariedades.vercel.app" />
        <meta name="google" content="notranslate" />
        <meta
          name="google-site-verification"
          content="RSeN15pAH1nf7lb2vU2Inpqr1-qVmIWf8cfWD0EBEu8"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
