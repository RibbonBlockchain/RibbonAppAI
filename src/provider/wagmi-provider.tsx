"use client";

import { http, createConfig } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { coinbaseWallet, metaMask } from "wagmi/connectors";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

export const getConfig = createConfig({
  chains: [base, baseSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({ appName: "Create Wagmi", preference: "smartWalletOnly" }),
  ],
  // connectors: [metaMask()],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
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
