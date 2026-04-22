import type { Metadata } from "next";
import { Toaster } from "sonner";
import "@mdxeditor/editor/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "RPP Generator AI - Asisten Pembuat Rencana Pelaksanaan Pembelajaran",
  description: "Platform AI untuk membantu guru menyusun draf Rencana Pelaksanaan Pembelajaran (RPP) Kurikulum Merdeka dan Kurikulum 2013 secara cepat, terstruktur, dan siap pakai.",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "RPP Generator AI - Asisten Pembuat RPP",
    description: "Susun draf Rencana Pelaksanaan Pembelajaran (RPP) Kurikulum Merdeka dan Kurikulum 2013 dalam hitungan detik menggunakan kecerdasan buatan.",
    url: "https://rpp-generator.vercel.app",
    siteName: "RPP Generator AI",
    images: [
      {
        url: "/assets/rpp-kurikulum-image.png",
        width: 1200,
        height: 630,
        alt: "Preview RPP Generator AI",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RPP Generator AI - Asisten Pembuat RPP",
    description: "Susun draf RPP Kurikulum Merdeka & 2013 secara cepat, terstruktur, dan siap edit.",
    images: ["/assets/rpp-kurikulum-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
