import "./ui/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { getServerSession } from "next-auth/next";
import SessionProvider from "@/provider/session-provider";
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
  const session = await getServerSession();

  return (
    <html lang="en" className={`h-full ${inter.className}`}>
      <body className="h-full">
        <SessionProvider session={session}>
          <ReactQueryProvider>
            {/* <main className="w-full max-w-[500px] h-[inherit] mx-auto p-4 sm:p-6"> */}
            <main className="w-full max-w-[500px] h-[inherit] mx-auto">
              {children}
            </main>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
