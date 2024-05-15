"use client";

import {
  UX_MODE,
  IProvider,
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  CustomChainConfig,
  ChainNamespaceType,
} from "@web3auth/base";
import {
  OpenloginAdapter,
  OpenloginLoginParams,
  OpenloginUserInfo,
} from "@web3auth/openlogin-adapter";
import Web3 from "web3";
import { LucideCopy } from "lucide-react";
import { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import BackArrowButton from "@/components/button/back-arrow";
import { shorten, shortenTransaction } from "@/lib/utils/shorten";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import toast from "react-hot-toast";
import RPC from "./web3RPC";

// IMP START - Dashboard Registration
const clientId =
  "BFNvw32pKnVURo4cx9n1uCc0MO7_iisPEdoX_4JYXvXlebOVYiuOmCXHxI0k3EVYSWiPaxNIY-T5iII8CncmJfU"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xA", // hex of 10
  rpcTarget: "https://rpc.ankr.com/optimism",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Optimism Mainnet",
  blockExplorerUrl: "https://optimistic.etherscan.io",
  ticker: "OP",
  tickerName: "OP",
  logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
};

// config from OP websire
// const chainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: "11155420", // hex of 10
//   rpcTarget: "https://sepolia.optimism.io/",
//   displayName: "OP Sepolia",
//   blockExplorerUrl: "https://sepolia-optimistic.etherscan.io/",
//   ticker: "OP",
//   tickerName: "OP",
//   logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
// };

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3AuthNoModal({
  clientId,
  // web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET, // mainnet configuration requires payment to be used in deployed app
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter();
web3auth.configureAdapter(openloginAdapter);

const Wallet = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState<Partial<OpenloginUserInfo>>();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [sign, setSign] = useState("");

  const [message, setMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
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

  // get user info
  const getUserInfo = async () => {
    try {
      const user = await web3auth.getUserInfo();
      setUserInfo(user);
    } catch (error) {
      console.error(error); // Web3ValidatorError: Web3 validator found 1 error[s]:value at "/1" is required
    }
  };

  // authenticate user
  const authenticateUser = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  // get user accounts
  const getAccounts = async () => {
    if (!provider) {
      console.error("Provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    try {
      const accounts = await web3.eth.getAccounts();
      setAddress(accounts[0] || "");
    } catch (error) {
      console.error(error);
    }
  };

  // get wallet balance
  const getBalance = async () => {
    if (!provider) {
      console.error("Provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);
    const accounts = await web3.eth.getAccounts();

    try {
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );
      setBalance(balance);
    } catch (error) {
      console.error(error); //Web3ValidatorError: Web3 validator found 1 error[s]:value at "/1" is required
    }
  };

  // send transaction
  const sendTransaction = async (destination: string, amount: number) => {
    const web3 = new Web3(provider as any);

    try {
      const fromAddress = (await web3.eth.getAccounts())[0];
      // const destination = "0x7aFac68875d2841dc16F1730Fba43974060b907A";

      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: web3.utils.toWei(amount, "ether"),
        maxPriorityFeePerGas: web3.utils.toHex("0.000000005"),
        maxFeePerGas: web3.utils.toHex("0.000000000006"),
      });

      console.log("Transaction sent:", receipt);
    } catch (error: any) {
      console.error("Error sending transaction:", error);
      toast.error(`Error sending transaction`);
    }
  };

  // sign a message
  const signMessage = async (yourMessage: string) => {
    if (!provider) {
      console.error("Provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);
    const accounts = await web3.eth.getAccounts();
    const originalMessage = yourMessage || "YOUR_DEFAULT_MESSAGE";
    try {
      const signedMessage = await web3.eth.personal.sign(
        originalMessage,
        accounts[0],
        "test password!"
      );
      setSign(signedMessage);
    } catch (error) {
      console.error(error); //Web3ValidatorError: Web3 validator found 1 error[s]:value at "/1" is required
    }
  };

  // get chain ID
  const getChainId = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId, "chain ID");
  };
  getChainId();

  const chains: Chain[] = [
    {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth",
      displayName: "Ethereum Mainnet",
      blockExplorerUrl: "https://etherscan.io",
      ticker: "ETH",
      tickerName: "Ethereum",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0xA", // hex of 10
      rpcTarget: "https://rpc.ankr.com/optimism",
      displayName: "Optimism Mainnet",
      blockExplorerUrl: "https://optimistic.etherscan.io",
      ticker: "OP",
      tickerName: "OP",
      logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    },
    {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x38", // hex of 56
      rpcTarget: "https://rpc.ankr.com/bsc",
      displayName: "Binance SmartChain Mainnet",
      blockExplorerUrl: "https://bscscan.com/",
      ticker: "BNB",
      tickerName: "BNB",
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    },
    {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x89", // hex of 137, polygon mainnet
      rpcTarget: "https://rpc.ankr.com/polygon",
      displayName: "Polygon Mainnet",
      blockExplorerUrl: "https://polygonscan.com",
      ticker: "MATIC",
      tickerName: "MATIC",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    },
    {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/solana",
      displayName: "Solana Mainnet",
      blockExplorerUrl: "https://explorer.solana.com",
      ticker: "SOL",
      tickerName: "Solana",
      logo: "https://images.toruswallet.io/solana.svg",
    },
    {
      chainNamespace: CHAIN_NAMESPACES.OTHER,
      chainId: "0x1",
      rpcTarget: "https://ripple-node.tor.us",
      wsTarget: "wss://s2.ripple.com",
      ticker: "XRP",
      tickerName: "XRPL",
      displayName: "xrpl mainnet",
      blockExplorerUrl: "https://livenet.xrpl.org",
    },
  ];

  interface Chain {
    chainId: string;
    displayName: string;
    chainNamespace: ChainNamespaceType;
    tickerName: string;
    ticker: string;
    rpcTarget: string;
    blockExplorerUrl: string;
    logo?: string;
    wsTarget?: string;
  }

  const addChain = async (chain: Chain) => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }

    if (!chain) {
      toast.error("Please select a chain first");
      return;
    }

    try {
      await web3auth?.addChain(chain);
      console.log("New Chain Added>>>>", chain);
      toast.success("New chain added successfully!");
    } catch (error) {
      console.error("Error adding new chain:", error);
      toast.error("Failed to add new chain.");
    }
  };

  const switchChain = async (chain: Chain) => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    await web3auth?.switchChain({ chainId: chain.chainId });
    console.log(`Chain Switched to ${chain.chainId} - ${chain.displayName}`);
  };

  // handle event change
  const handleChangeSignTx = (event: any) => {
    setMessage(event.target.value);
  };

  const handleChangeAmount = (event: any) => {
    setAmount(event.target.value);
  };

  const handleChangeDestination = (event: any) => {
    setDestination(event.target.value);
  };

  const login = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      { loginProvider: "google" }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    // uiConsole("Logged out");
  };

  getUserInfo();
  getAccounts();
  getBalance();

  // copy messages
  const copyToClipboard = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChainId = event.target.value;
    const chain = chains.find((chain) => chain.chainId === selectedChainId);
    setSelectedChain(chain || null);
  };

  return (
    <div className="p-4 sm:p-6 bg-[#F7F5FF] h-auto flex flex-col">
      <div className="mb-6">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10  flex-row items-center justify-center text-base font-semibold">
          Wallet
        </div>

        {web3auth.connected ? (
          <div className="px-4 py-2 w-fit bg-green-500 text-white rounded-full hover:bg-green-600 mr-2 mt-4 ">
            on
          </div>
        ) : (
          <div className="px-4 py-2 w-fit bg-red-500 text-white rounded-full hover:bg-red-600 mr-2 mt-4">
            off
          </div>
        )}
      </div>

      {loggedIn ? (
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-end justify-end">
            <button
              onClick={logout}
              className="px-4 py-2 w-fit bg-red-500 text-white rounded hover:bg-red-600 mr-2 mt-4"
            >
              Log Out Wallet
            </button>
          </div>

          <div>
            <button onClick={authenticateUser} className="card">
              Get ID Token
            </button>
          </div>

          {/* get a chainId */}
          <div>
            <button onClick={getChainId} className="card">
              Get Chain ID
            </button>
          </div>

          {/* add a chain */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <select
                onChange={handleSelect}
                className="px-1 border-2 border-black"
              >
                <option value="">Select a Chain</option>
                {chains.map((chain) => (
                  <option key={chain.displayName} value={chain.chainId}>
                    {chain.displayName}
                  </option>
                ))}
              </select>
              <button
                className="cursor-pointer w-fit px-2 py-2  bg-green-500 min-w-[80px] text-white rounded hover:bg-green-600"
                onClick={() => selectedChain && addChain(selectedChain)}
              >
                Add Chain
              </button>
            </div>
            <div>
              {selectedChain && (
                <div>
                  {selectedChain.displayName} - {selectedChain.ticker}
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              onClick={() => selectedChain && switchChain(selectedChain)}
              className="card"
            >
              Switch Chain
            </button>
          </div>

          <div onClick={getUserInfo}>
            {/* <div> */}
            <p>Get User Info</p>
            <p>name: {userInfo?.name}</p>
            <p>email: {userInfo?.email}</p>
          </div>

          <div onClick={getAccounts}>
            <p>Get Wallet address</p>
            <div className="flex items-center gap-5">
              <p>{shorten(address)}</p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  copyToClipboard(address), toast.success(`copied`);
                }}
              >
                <LucideCopy size={18} />
              </p>
            </div>
          </div>

          <div onClick={getBalance}>
            <p>Get Wallet Balance</p>
            <p>{parseFloat(balance).toFixed(5)} ETH</p>
          </div>

          <div className="border-2 border-gray-600 p-2">
            <p className="mb-3">Send Tx</p>

            <div className="flex flex-col items-start justify-between gap-1 w-full mb-2">
              <input
                type="text"
                value={amount}
                onChange={handleChangeAmount}
                placeholder="Enter amount"
                className="border border-gray-300 p-2 rounded w-[40%]"
              />
              <input
                type="text"
                value={destination}
                onChange={handleChangeDestination}
                placeholder="Enter destination wallet adddress"
                className="border border-gray-300 p-2 rounded w-full"
              />

              <div
                onClick={() => sendTransaction(destination, amount)}
                className="cursor-pointer w-fit px-2 py-2  bg-green-500 min-w-[80px] text-white rounded hover:bg-green-600"
              >
                Send
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-600 p-2 mb-20">
            <p className="mb-3">Sign or Hash your Txs</p>
            <div className="flex flex-row items-center justify-between gap-1 w-full mb-2">
              <input
                type="text"
                value={message}
                onChange={handleChangeSignTx}
                placeholder="Enter your message"
                className="border border-gray-300 p-2 rounded w-full"
              />

              <p
                onClick={() => signMessage(message)}
                className="px-2 py-2 w-fit bg-green-500 min-w-[80px] text-white rounded hover:bg-green-600"
              >
                Sign Tx
              </p>
            </div>
            <div className="flex items-center gap-5">
              <p>Signed Tx: {shortenTransaction(sign)}</p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  copyToClipboard(address), toast.success(`copied`);
                }}
              >
                <LucideCopy size={18} />
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Your wallet is not connected</p>
          <button
            onClick={login}
            className="px-4 py-2 w-fit bg-green-500 text-white rounded hover:bg-green-600 mr-2 mt-4"
          >
            Login / Connect wallet
          </button>
        </div>
      )}

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
};

export default Wallet;
