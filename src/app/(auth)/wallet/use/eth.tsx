"use client";

import {
  UX_MODE,
  IProvider,
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
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

// IMP START - Dashboard Registration
const clientId =
  "BFNvw32pKnVURo4cx9n1uCc0MO7_iisPEdoX_4JYXvXlebOVYiuOmCXHxI0k3EVYSWiPaxNIY-T5iII8CncmJfU"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Devnet",
  // displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  // web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter();
web3auth.configureAdapter(openloginAdapter);

const Wallet = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [PK, setPK] = useState("");

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
        maxPriorityFeePerGas: web3.utils.toHex("5000000000"),
        maxFeePerGas: web3.utils.toHex("6000000000000"),
      });

      console.log("Transaction sent:", receipt);
    } catch (error) {
      console.error("Error sending transaction:", error);
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

  return (
    <div className="p-4 sm:p-6 bg-[#F7F5FF] h-full flex flex-col">
      <div className="mb-6">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10  flex-row items-center justify-center text-base font-semibold">
          Wallet
        </div>
      </div>

      {loggedIn ? (
        <div className="grid grid-cols-1 gap-6">
          <div>
            <p>User</p>
            <p>name: {userInfo?.name}</p>
            <p>email: {userInfo?.email}</p>
          </div>

          <div>
            <p>Wallet address</p>
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

          <div>
            <p>Wallet Balance</p>
            <p>{balance} ETH</p>
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

          <div className="border-2 border-gray-600 p-2">
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

          <div>
            <button
              onClick={logout}
              className="px-4 py-2 w-fit bg-green-500 text-white rounded hover:bg-green-600 mr-2 mt-4"
            >
              Log Out Wallet
            </button>
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
