"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query.provider";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </ReactQueryProvider>
  );
};

export default RootProvider;
