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
  OpenloginUserInfo,
  OpenloginLoginParams,
} from "@web3auth/openlogin-adapter";

import Web3 from "web3";
import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import BackArrowButton from "@/components/button/back-arrow";
import { shorten, shortenTransaction } from "@/lib/utils/shorten";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ArrowDown, ArrowUp, DollarSign, LucideCopy } from "lucide-react";

const clientId =
  "BFNvw32pKnVURo4cx9n1uCc0MO7_iisPEdoX_4JYXvXlebOVYiuOmCXHxI0k3EVYSWiPaxNIY-T5iII8CncmJfU";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xA", // hex of 10
  rpcTarget: "https://optimism.drpc.org",
  displayName: "Optimism Mainnet",
  blockExplorerUrl: "https://optimistic.etherscan.io",
  ticker: "OP",
  tickerName: "OP",
  logo: "https://icons.llamao.fi/icons/chains/rsz_optimism.jpg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3AuthNoModal({
  clientId,
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
        maxPriorityFeePerGas: web3.utils.toHex("1.500000005"),
        maxFeePerGas: web3.utils.toHex("1.500000000006"),
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

  useEffect(() => {
    getUserInfo();
    getAccounts();
    getBalance();
  }, [authenticateUser()]);

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

  const walletList = [
    {
      id: "1",
      name: "Worldcoin",
      logo: "/images/world-coin.png",
      priceIndex: 20,
      unit: "WLD",
      balance: 100.5,
    },
    {
      id: "2",
      name: "Worldcoin",
      logo: "/images/world-coin.png",
      priceIndex: 20,
      unit: "WLD",
      balance: 100.5,
    },
    {
      id: "3",
      name: "Worldcoin",
      logo: "/images/world-coin.png",
      priceIndex: 20,
      unit: "WLD",
      balance: 100.5,
    },
    {
      id: "4",
      name: "Worldcoin",
      logo: "/images/world-coin.png",
      priceIndex: 20,
      unit: "WLD",
      balance: 100.5,
    },
    {
      id: "5",
      name: "Worldcoin",
      logo: "/images/world-coin.png",
      priceIndex: 20,
      unit: "WLD",
      balance: 100.5,
    },
  ];

  const [showWallet, setShowWallet] = useState(false);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-white flex flex-col">
      <div className="mb-6">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10  flex-row items-center justify-center text-base font-semibold">
          Wallet
        </div>
      </div>

      {loggedIn ? (
        // <div className="grid grid-cols-1 gap-6">
        //   <div className="border-2 border-gray-600 p-2">
        //     <p className="mb-3">Send Tx</p>

        //     <div className="flex flex-col items-start justify-between gap-1 w-full mb-2">
        //       <input
        //         type="text"
        //         value={amount}
        //         onChange={handleChangeAmount}
        //         placeholder="Enter amount"
        //         className="border border-gray-300 p-2 rounded w-[40%]"
        //       />
        //       <input
        //         type="text"
        //         value={destination}
        //         onChange={handleChangeDestination}
        //         placeholder="Enter destination wallet adddress"
        //         className="border border-gray-300 p-2 rounded w-full"
        //       />

        //       <div
        //         onClick={() => sendTransaction(destination, amount)}
        //         className="cursor-pointer w-fit px-2 py-2  bg-green-500 min-w-[80px] text-white rounded hover:bg-green-600"
        //       >
        //         Send
        //       </div>
        //     </div>
        //   </div>

        //   <div className="border-2 border-gray-600 p-2 mb-20">
        //     <p className="mb-3">Sign or Hash your Txs</p>
        //     <div className="flex flex-row items-center justify-between gap-1 w-full mb-2">
        //       <input
        //         type="text"
        //         value={message}
        //         onChange={handleChangeSignTx}
        //         placeholder="Enter your message"
        //         className="border border-gray-300 p-2 rounded w-full"
        //       />

        //       <p
        //         onClick={() => signMessage(message)}
        //         className="px-2 py-2 w-fit bg-green-500 min-w-[80px] text-white rounded hover:bg-green-600"
        //       >
        //         Sign Tx
        //       </p>
        //     </div>
        //     <div className="flex items-center gap-5">
        //       <p>Signed Tx: {shortenTransaction(sign)}</p>
        //       <p
        //         className="cursor-pointer"
        //         onClick={() => {
        //           copyToClipboard(address), toast.success(`copied`);
        //         }}
        //       >
        //         <LucideCopy size={18} />
        //       </p>
        //     </div>
        //   </div>
        // </div>

        <>
          <div className="flex flex-col gap-2 mb-10">
            <div className="text-center ">
              <div className="flex mt-6 flex-row gap-5 items-center justify-center ">
                <p className="text-[16px]">{shorten(address)}</p>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    console.log(address, "wallet");
                    copyToClipboard(address), toast.success(`copied`);
                  }}
                >
                  <LucideCopy fill="#939393" stroke="#939393" size={16} />
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
              <div
                onClick={() => sendTransaction(destination, amount)}
                className="w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]  "
              >
                <ArrowUp stroke="#7C56FE" />
                Send
              </div>
              <div
                onClick={() => signMessage(message)}
                className="w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]"
              >
                <DollarSign stroke="#7C56FE" />
                Sign
              </div>
            </div>

            <div className="hidden items-end justify-end">
              <button
                onClick={logout}
                className="px-4 py-2 w-fit bg-red-500 text-white rounded hover:bg-red-600 mr-2 mt-4"
              >
                Log Out Wallet
              </button>
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

            <div className="w-[inherit]">
              {showWallet ? (
                <>
                  <div className="flex flex-col gap-4 mt-6">
                    {walletList.map((i) => (
                      <div
                        key={i.id}
                        className="flex flex-row items-center justify-between p-3 border border-[#D6CBFF] rounded-[12px]"
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <div className="w-[35px] h-[35px] flex items-center ">
                            <Image
                              width={35}
                              height={35}
                              src={i.logo}
                              alt="coin logo"
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <p className="text-base font-normal">{i.name}</p>
                            <p className="text-xs text-[#626262]">
                              {i.priceIndex} {i.unit}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm">$ {i.balance}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center flex items-center justify-center mt-6 h-[200px]">
                  Your list of transactions will be displayed here
                </div>
              )}
            </div>

            <div className="hidden">
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
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-evenly mb-20">
          <div>
            <Image
              src=""
              alt=""
              height={212}
              width={232}
              className="bg-purple-500"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-10">
            <p className="text-2xl font-semibold">Manage your assets easily</p>
            <button
              onClick={login}
              className="px-6 py-2 w-fit bg-[#7C56FE] text-white font-medium rounded-md hover:bg-[#6745d6] mr-2 mt-4"
            >
              Connect wallet
            </button>
          </div>
        </div>
      )}

      {/* <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div> */}
    </div>
  );
};

export default Wallet;
