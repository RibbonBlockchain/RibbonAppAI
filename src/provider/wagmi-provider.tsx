"use client";

import { http, createConfig } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

export const getConfig = createConfig({
  chains: [baseSepolia, base],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({ appName: "Create Wagmi", preference: "smartWalletOnly" }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof getConfig;
  }
}

export function WagmiCustomProvider(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig);

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      {props.children}
    </WagmiProvider>
  );
}
