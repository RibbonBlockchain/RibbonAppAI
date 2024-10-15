"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import OfflineMessage from "@/containers/error/offline-message";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { BaseProvider } from "@/app/(auth)/wallet/baseProvider";

const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(new QueryClient());

  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return online ? (
    <BaseProvider>
      <QueryClientProvider client={client}>
        <SessionProvider>{children}</SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BaseProvider>
  ) : (
    <OfflineMessage />
  );
};

export default ReactQueryProvider;
