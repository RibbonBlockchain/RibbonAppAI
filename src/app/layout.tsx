import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ribbon Protocol",
  description: "Earn tokenized Universal Basic Income",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <main className="max-w-[500px] h-[inherit] mx-auto p-4 sm:p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
