"use client";

import {
  UX_MODE,
  IProvider,
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  OPENLOGIN_NETWORK,
} from "@web3auth/base";
import {
  OpenloginAdapter,
  OpenloginLoginParams,
} from "@web3auth/openlogin-adapter";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";

import clsx from "clsx";
import RPC from "./web3RPC"; //for web3.js
import { useEffect, useState } from "react";
import { shorten } from "@/lib/utils/shorten";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { WalletConnectModal } from "@walletconnect/modal";
import BackArrowButton from "@/components/button/back-arrow";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ArrowDown, ArrowUp, DollarSign, LucideCopy } from "lucide-react";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";
// "BFNvw32pKnVURo4cx9n1uCc0MO7_iisPEdoX_4JYXvXlebOVYiuOmCXHxI0k3EVYSWiPaxNIY-T5iII8CncmJfU";

const chainConfig = {
  // OPTIMISM MAINNET
  // chainId: "0xa", // 10
  // displayName: "OP Mainnet",
  // chainNamespace: CHAIN_NAMESPACES.EIP155,
  // tickerName: "OP Mainnet",
  // ticker: "OP",
  // rpcTarget: "https://optimism.drpc.org",
  // blockExplorerUrl: "https://sepolia.etherscan.io",
  // logo: "https://icons.llamao.fi/icons/chains/rsz_optimism.jpg",

  // OPTIMISM SEPOLIA
  chainId: "0xaa37dc", // 11155420
  displayName: "OP Sepolia Testnet",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  tickerName: "OP Sepolia",
  ticker: "OP",
  rpcTarget: "https://endpoints.omniatech.io/v1/op/sepolia/public",
  blockExplorerUrl: "https://sepolia-optimistic.etherscan.io/",
  logo: "https://icons.llamao.fi/icons/chains/rsz_optimism.jpg",

  // ETH MAINNET
  // chainNamespace: CHAIN_NAMESPACES.EIP155,
  // chainId: "0x1", // 1 Please use 0x1 for Mainnet
  // rpcTarget: "https://rpc.ankr.com/eth",
  // displayName: "Ethereum Mainnet",
  // blockExplorerUrl: "https://etherscan.io/",
  // ticker: "ETH",
  // tickerName: "Ethereum",
  // logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",

  // ETH SEPOLIA
  // chainId: "0xaa36a7", // 11155111 for wallet connect make sure to pass in this chain in the loginSettings of the adapter.
  // displayName: "Ethereum Sepolia",
  // chainNamespace: CHAIN_NAMESPACES.EIP155,
  // tickerName: "Ethereum Sepolia",
  // ticker: "ETH",
  // rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // blockExplorerUrl: "https://sepolia.etherscan.io",
  // logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {
    modalZIndex: 99999,
    web3AuthClientId: clientId,
    web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_MAINNET,
  },
  walletInitOptions: {},
});

const Wallet = () => {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3auth = new Web3AuthNoModal({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
          privateKeyProvider,
          uiConfig: {
            appName: "W3A Heroes",
            appUrl: "https://web3auth.io",
            logoLight: "https://web3auth.io/images/web3authlog.png",
            logoDark: "https://web3auth.io/images/web3authlogodark.png",
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            mode: "light", // whether to enable dark mode. defaultValue: false
            theme: {
              primary: "#768729",
            },
            useLogoLoader: true,
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
            mfaSettings: {
              // deviceShareFactor: {
              //   enable: true,
              //   priority: 1,
              //   mandatory: true,
              // },
              // backUpShareFactor: {
              //   enable: true,
              //   priority: 2,
              //   mandatory: false,
              // },
              // socialBackupFactor: {
              //   enable: true,
              //   priority: 3,
              //   mandatory: false,
              // },
              // passwordFactor: {
              //   enable: true,
              //   priority: 4,
              //   mandatory: false,
              // },
            },
          },
          loginSettings: {
            mfaLevel: "optional",
          },
          privateKeyProvider,
        });
        web3auth.configureAdapter(openloginAdapter);

        // adding wallet connect v2 adapter
        const defaultWcSettings = await getWalletConnectV2Settings(
          CHAIN_NAMESPACES.EIP155,
          ["0x1", "0xaa36a7"],
          "04309ed1007e77d1f119b85205bb779d"
        );
        const walletConnectModal = new WalletConnectModal({
          projectId: "04309ed1007e77d1f119b85205bb779d",
        });
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: {
            qrcodeModal: walletConnectModal,
            ...defaultWcSettings.adapterSettings,
          },
          loginSettings: { ...defaultWcSettings.loginSettings },
        });

        web3auth.configureAdapter(walletConnectV2Adapter);
        setWeb3Auth(web3auth);
        await web3auth.init();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    // uiConsole(idToken);
    return idToken;
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    // uiConsole(user);
    return user;
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const [chainName, setChainName] = useState("");
  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();

    if (chainId === "11155420") {
      console.log("OP Sepolia Testnet", chainId);
      setChainName("OP Sepolia Testnet");
    } else if (chainId === "10") {
      console.log("OP Mainnet", chainId);
      setChainName("OP Mainnet");
    } else if (chainId === "1") {
      console.log("Ethereum Mainnet", chainId);
      setChainName("Ethereum Mainnet");
    } else {
      console.log("Ethereum Sepolia", chainId);
      setChainName("Ethereum Sepolia");
    }
  };

  const [walletAddress, setWalletAddress] = useState("");
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    // uiConsole(address);
    setWalletAddress(address);
    console.log(address);
  };

  const [balance, setBalance] = useState("");
  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    // uiConsole(balance);
    setBalance(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    // uiConsole(receipt);
    return receipt;
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    // uiConsole(signedMessage);
    return signMessage;
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    return privateKey;
    // uiConsole(privateKey);
  };

  const showWalletUi = async () => {
    if (!walletServicesPlugin) {
      console.log("provider not initialized yet");
      return;
    }
    await walletServicesPlugin.showWalletUi();
  };

  const [showWallet, setShowWallet] = useState(false);

  useEffect(() => {
    getAccounts();
    getBalance();
  }, [provider]);

  const loggedInView = (
    <>
      <div className="flex flex-col gap-2 mb-10">
        <div className="text-center">
          <p className="mb-2">wallet</p>
          <div className="flex flex-row gap-5 items-center justify-center ">
            <p className="text-[16px]">{shorten(walletAddress[0])}</p>
            <p
              className="cursor-pointer"
              // onClick={() => {
              //   console.log(walletAddress[0], "wallet");
              //   copyToClipboard(walletAddress[0]), toast.success(`copied`);
              // }}
            >
              <LucideCopy size={16} />
            </p>
          </div>

          <div className="flex flex-row gap-1 items-center justify-center font-semibold ">
            <p className="text-[48px]">
              <a className="text-[24px]">$</a> {balance}
            </p>
          </div>
        </div>

        <div className="w-full py-10 flex gap-4 items-center justify-between">
          <div className="w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]  ">
            <ArrowDown stroke="#7C56FE" />
            Recieve
          </div>
          <div className="w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]  ">
            <ArrowUp stroke="#7C56FE" />
            Send
          </div>
          <div className="w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]  ">
            <DollarSign stroke="#7C56FE" />
            Sign
          </div>
        </div>

        <div className="w-full bg-[#F5F5F5] px-2 py-2 flex flex-row items-center justify-between gap-2 rounded-[18px] ">
          <p
            onClick={() => setShowWallet(true)}
            className={clsx(
              "w-full text-center py-3 text-black",
              showWallet && "text-white bg-[#7C56FE] rounded-[16px]"
            )}
          >
            Wallets
          </p>
          <p
            onClick={() => setShowWallet(false)}
            className={clsx(
              "w-full text-center py-3 text-black bg-[#7C56FE] rounded-[16px]",
              showWallet && "text-black bg-[inherit]"
            )}
          >
            History
          </p>
        </div>

        <div className="">
          {showWallet ? (
            <div className="text-center flex items-center justify-center min-h-[200px]">
              Your list of wallets will be displayed here
            </div>
          ) : (
            <div className="text-center flex items-center justify-center min-h-[200px]">
              Your list of transactions will be displayed her{" "}
            </div>
          )}
        </div>

        <div className="hidden">
          <div className=" items-end justify-end">
            <button
              onClick={logout}
              className="px-4 py-2 w-fit bg-red-500 text-white rounded hover:bg-red-600 mr-2 mt-4"
            >
              Log Out Wallet
            </button>
          </div>

          <div className="">
            <button onClick={getChainId} className="card">
              Get Chain ID
            </button>
            <div className="flex flex-row gap-1 bg-slate-500 w-fit px-5 py-1 rounded-full items-center justify-center font-normal">
              <p className="text-[18px]">{chainName}</p>
            </div>
          </div>

          <div>
            <button onClick={getUserInfo} className="card">
              Get User Info
            </button>
          </div>
          <div>
            <button onClick={authenticateUser} className="card">
              Get ID Token
            </button>
          </div>
          {/* <div>
        <button onClick={getChainId} className="card">
          Get Chain ID
        </button>
      </div> */}

          <div>
            <button onClick={signMessage} className="card">
              Sign Message
            </button>
          </div>
          <div>
            <button onClick={sendTransaction} className="card">
              Send Transaction
            </button>
          </div>
          <div>
            <button onClick={getPrivateKey} className="card">
              Get Private Key
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <div>
      <p>Your wallet is not connected</p>
      <button
        onClick={login}
        className="px-4 py-2 w-fit bg-green-500 text-white rounded hover:bg-green-600 mr-2 mt-4"
      >
        Login / Connect wallet
      </button>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-white h-[inherit] flex flex-col">
      <div className="mb-6">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10  flex-row items-center justify-center text-base font-semibold">
          Wallet
        </div>
      </div>

      <div className="grid ">{loggedIn ? loggedInView : unloggedInView}</div>
    </div>
  );
};

export default Wallet;
