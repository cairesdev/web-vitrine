const baseUrl = process.env.NEXT_PUBLIC_DNS
  ? `https://${process.env.NEXT_PUBLIC_DNS}`
  : "http://localhost:3000";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
