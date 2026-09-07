import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paradise Cafe & Billiard | Keling, Kediri",
  description: "Cafe, billiard, karaoke, tempat pengajian dan rapat di Keling, Kepung, Kediri.",
  keywords: ["Paradise Cafe & Billiard", "Cafe Keling", "Billiard Keling", "Kediri", "ikan bakar"],
  openGraph: {
    title: "Paradise Cafe & Billiard",
    description: "Eat. Play. Sing. Gather.",
    images: ["/images/logo-paradise.jpg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}