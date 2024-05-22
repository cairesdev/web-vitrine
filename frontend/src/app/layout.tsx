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
        <meta
          name="google-site-verification"
          content="tv9OHVb6U6zIc9EjHP3NbhXsVdO5BG7xZa6b1-0FitU"
        />
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
      <body>{children}</body>
    </html>
  );
}
