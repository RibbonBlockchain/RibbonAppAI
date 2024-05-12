"use client";

import BackArrowButton from "@/components/button/back-arrow";
import { shorten, shortenTransaction } from "@/lib/utils/shorten";
import {
  CHAIN_NAMESPACES,
  IProvider,
  UX_MODE,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import {
  OpenloginAdapter,
  OpenloginUserInfo,
} from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";
import Web3 from "web3";

// IMP START - Dashboard Registration
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
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
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
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

  const getUserInfo = async () => {
    try {
      const user = await web3auth.getUserInfo();
      setUserInfo(user);
    } catch (error) {
      console.error(error); // Web3ValidatorError: Web3 validator found 1 error[s]:value at "/1" is required
    }
  };

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

  const handleChange = (event: any) => {
    setMessage(event.target.value);
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
  // signMessage(message);

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
            <p>{shorten(address)}</p>
          </div>

          <div>
            <p>Wallet Balance</p>
            <p>{balance} ETH</p>
          </div>

          <div>
            <p className="mb-3">Sing your Txs</p>
            <div className="flex flex-row items-center justify-between gap-1 w-full mb-2">
              <input
                type="text"
                value={message}
                onChange={handleChange}
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
            <p>Signed Tx: {shortenTransaction(sign)}</p>
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
