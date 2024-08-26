import "./globals.css";
import type { Metadata } from "next";
import RootProvider from "@/provider";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Ribbon Protocol",
  description: "Earn tokenized Universal Basic Income",
};

const inter = localFont({
  display: "swap",
  src: "../../public/fonts/Nunito-Regular.ttf",
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={`h-full ${inter.className}`}>
      <body className="h-full bg-white">
        <RootProvider>
          <main className="w-full max-w-[500px] h-[inherit] mx-auto">
            {children}
          </main>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
