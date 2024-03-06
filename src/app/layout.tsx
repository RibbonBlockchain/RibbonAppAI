import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ReactQueryProvider from "@/provider/react-query-provider";

export const metadata: Metadata = {
  title: "Ribbon Protocol",
  description: "Earn tokenized Universal Basic Income",
};

const inter = localFont({
  display: "swap",
  src: "../../public/fonts/inter.woff2",
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={`h-full ${inter.className}`}>
      <body className="h-full">
        <ReactQueryProvider>
          <main className="w-full max-w-[500px] h-[inherit] mx-auto">
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
