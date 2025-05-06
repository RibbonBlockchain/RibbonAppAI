"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query.provider";
import { ThemeProvider } from "next-themes";
import { SocialMediaProvider } from "@/context/socialmediacontext";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    // <ThemeProvider enableSystem={true} attribute="class">
    <ReactQueryProvider>
      {/* <SocialMediaProvider> */}
      <SessionProvider>{children}</SessionProvider>
      {/* </SocialMediaProvider> */}
      <Toaster />
    </ReactQueryProvider>
    // </ThemeProvider>
  );
};

export default RootProvider;
