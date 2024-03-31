import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Controlle: Calcular férias",
  description: "Calcule as suas férias rápidamente e sem erros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body className="flex h-screen flex-col bg-gentleSky text-graphite">
        <Header />

        {children}
      </body>
    </html>
  );
}
