"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query.provider";
import { ThemeProvider } from "next-themes";
import { WagmiCustomProvider } from "./wagmi-provider";

interface RootProviderProps extends React.PropsWithChildren {
  initialState: any;
}

const RootProvider = ({ children, initialState }: RootProviderProps) => {
  return (
    <WagmiCustomProvider initialState={initialState}>
      <ReactQueryProvider>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </ReactQueryProvider>
    </WagmiCustomProvider>
  );
};

export default RootProvider;
