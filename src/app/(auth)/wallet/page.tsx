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
import { SwapIcon, SwapIconGray, WalletMoney } from "@/public/images";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import BackArrowButton from "@/components/button/back-arrow";
import { shorten, shortenTransaction } from "@/lib/utils/shorten";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ArrowDown, ArrowUp, DollarSign, LucideCopy } from "lucide-react";
import { BigNumber } from "bignumber.js"; // Import BigNumber library
import { useRouter } from "next/navigation";
import { useSwapPoints } from "@/api/user";
import { ArrowDownUp } from "lucide-react";
import { convertPoints } from "@/lib/utils/convertPoint";
import { onSuccess } from "@/api/api-client";
import { SpinnerIcon } from "@/components/icons/spinner";

const pointsABI = require("../contract/pointsABI.json");

const clientId =
  "BFNvw32pKnVURo4cx9n1uCc0MO7_iisPEdoX_4JYXvXlebOVYiuOmCXHxI0k3EVYSWiPaxNIY-T5iII8CncmJfU";

// const chainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: "0xA", // hex of 10
//   rpcTarget: "https://optimism.drpc.org",
//   displayName: "Optimism Mainnet",
//   blockExplorerUrl: "https://optimistic.etherscan.io",
//   ticker: "OP",
//   tickerName: "OP",
//   logo: "https://icons.llamao.fi/icons/chains/rsz_optimism.jpg",
// };

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa37dc", // 11155420
  displayName: "OP Sepolia",
  tickerName: "ETH",
  ticker: "ETH",
  rpcTarget: "https://optimism-sepolia.drpc.org",
  blockExplorerUrl: "https://sepolia-optimistic.etherscan.io/",
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
  const router = useRouter();

  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState<Partial<OpenloginUserInfo>>();
  const [address, setAddress] = useState("");
  localStorage.setItem("address", address);
  const [balance, setBalance] = useState("");
  const [sign, setSign] = useState("");

  const [message, setMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");

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

  // send native transaction
  const sendNativeTransaction = async (destination: string, amount: any) => {
    const web3 = new Web3(provider as any);

    try {
      const fromAddress = (await web3.eth.getAccounts())[0];

      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: web3.utils.toWei(amount, "ether"),
        // gasPrice: '20000000000', // 20 Gwei
        // gas: '21000', // 21,000 Gwei
        gasPrice: "20000000000",
        gas: "21000",
      });

      console.log("Transaction sent:", receipt);
    } catch (error: any) {
      console.error("Error sending transaction:", error);
      toast.error(`Error sending transaction`);
    }
  };

  // send transaction
  const sendTransaction = async (destination: string, amount: any) => {
    const web3 = new Web3(provider as any);

    const myaddress = (await web3.eth.getAccounts())[0];

    const ADDRESS = "0x04EC0289FC8ddAE121C0588f62dAe0fa3EE362d5";
    const contract = new web3.eth.Contract(pointsABI, ADDRESS);

    const decimal: any = await contract.methods.decimals().call();

    try {
      await web3.eth.sendTransaction({
        from: myaddress,
        to: destination,
        value: web3.utils.toWei(amount, "ether"),
        gasPrice: "20000000000",
        gas: "21000",
      });
      console.log(decimal, "here");

      console.log(destination, amount, "desinaition and amount");
    } catch (error) {
      console.log("Web3Auth error", error);
    }

    // 0x9E1A4104c7e6eE707945532bEd57DFBa36d40Cef
  };

  // points token
  const [point, setPoint] = useState("");
  const [pointName, setPointName] = useState("");

  const getPointToken = async () => {
    const web3 = new Web3(provider as any);

    const myaddress = (await web3.eth.getAccounts())[0];

    const ADDRESS = "0x004E9b9c6Ff44ccd0c2bD12addB9b9C56E893E62";

    const contract = new web3.eth.Contract(pointsABI, ADDRESS);

    const number: string = await contract.methods.balanceOf(myaddress).call();
    const decimal: number = await contract.methods.decimals().call();

    console.log(decimal, "decimal here");

    const numberBig: BigNumber = new BigNumber(number);
    const divisor: BigNumber = new BigNumber(10).pow(decimal);

    const result: BigNumber = numberBig.dividedBy(divisor);
    setPoint(result.toString());

    const tokenName: string = await contract.methods.name().call();
    setPointName(tokenName);

    try {
    } catch (error) {
      console.error("Error sending transaction:", error);
      toast.error(`Error sending transaction`);
    }
  };
  const pointToWLD = Number(point) / 5000;
  getPointToken();

  // world token
  const [wldToken, setWldToken] = useState("");
  const [worldTokenName, setWorldTokenName] = useState("");

  const getWorldToken = async () => {
    const web3 = new Web3(provider as any);

    const myaddress = (await web3.eth.getAccounts())[0];

    const ADDRESS = "0x04EC0289FC8ddAE121C0588f62dAe0fa3EE362d5";

    const contract = new web3.eth.Contract(pointsABI, ADDRESS);

    const number: string = await contract.methods.balanceOf(myaddress).call();
    const decimal: number = await contract.methods.decimals().call();

    const numberBig: BigNumber = new BigNumber(number);
    const divisor: BigNumber = new BigNumber(10).pow(decimal);

    const result: BigNumber = numberBig.dividedBy(divisor);
    setWldToken(result.toString());

    const tokenName: string = await contract.methods.name().call();
    setWorldTokenName(tokenName);

    try {
    } catch (error) {
      console.error("Error sending transaction:", error);
      toast.error(`Error sending transaction`);
    }
  };
  getWorldToken();

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

  const [showWallet, setShowWallet] = useState(true);

  const { mutate: swapPoints, isPending, isSuccess } = useSwapPoints();
  const handleSwapPoints = (amount: any) => {
    swapPoints({ amount: convertPoints(amount), address: address });
  };
  isSuccess && toast.success("points swapped");

  const [sendTx, setSendTx] = useState(false);
  const [swapTx, setSwapTx] = useState(false);

  const [pointsToSwap, setPointsToSwap] = useState("");

  return (
    <>
      {loggedIn ? (
        <>
          <div className="p-4 sm:p-6 min-h-screen bg-white flex flex-col">
            <div className="mb-6">
              <BackArrowButton stroke="#939393" />
              <div className="flex -mt-10 text-black  flex-row items-center justify-center text-base font-semibold">
                Wallet
              </div>
            </div>

            <div>
              {swapTx && (
                <div className="p-6 h-[300px] bg-gray-200 ">
                  <p>Swap Points to WLD here</p>
                  <div className="pt-5">
                    <p>Input points amount to swap</p>
                    <input
                      type="text"
                      value={pointsToSwap}
                      onChange={(e) => setPointsToSwap(e.target.value)}
                      className="border border-gray-800 py-2 px-2"
                    />
                  </div>

                  <button
                    disabled={isPending}
                    className={clsx(
                      "mt-4 py-2 px-4 rounded-md text-sm bg-purple-600"
                    )}
                    onClick={() => handleSwapPoints(pointsToSwap)}
                  >
                    {isPending ? <SpinnerIcon /> : "Swap"}
                  </button>

                  <button
                    className={
                      "flex justify-end mt-4 py-2 px-4 rounded-md text-sm bg-red-400"
                    }
                    onClick={() => setSwapTx(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            <div>
              {sendTx && (
                <div className="p-6 h-[370px] bg-gray-200 ">
                  <p>Send tokens here</p>
                  <div className="pt-5">
                    <p>Input recipient address here</p>

                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="border border-gray-800 py-2 px-2"
                    />
                  </div>

                  <div className="pt-5">
                    <p>Input amount here</p>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border border-gray-800 py-2 px-2"
                    />
                  </div>

                  <button
                    className={
                      "mt-4 py-2 px-4 rounded-md text-sm bg-purple-400"
                    }
                    onClick={() => {
                      sendNativeTransaction(destination, amount);
                      sendTransaction(
                        "0x1d9aa22b610d401f3884c55ebB1477173eCEf63F",
                        convertPoints(20)
                      );
                      console.log(destination, amount);
                    }}
                  >
                    Send
                  </button>

                  {/* 0x1d9aa22b610d401f3884c55ebB1477173eCEf63F */}

                  <button
                    className={
                      "flex justify-end mt-4 py-2 px-4 rounded-md text-sm bg-red-400"
                    }
                    onClick={() => setSendTx(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 mb-10 overflow-hidden">
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

                <div className="flex flex-col items-center justify-center font-semibold ">
                  <p className="text-[42px] w-fit">{balance} ETH</p>
                  <p className="text-[18px] text-[#626262]"> $ 0.00 </p>
                </div>
              </div>

              <div className="w-full py-10 flex gap-4 items-center justify-between">
                <div
                  onClick={() => router.push("/wallet/receive")}
                  className="cursor-pointer w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]  "
                >
                  <ArrowDown stroke="#7C56FE" />
                  Recieve
                </div>
                <div
                  // onClick={() => router.push("/withdraw/wallet-address")}
                  onClick={() => setSendTx(true)}
                  className="cursor-pointer w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]  "
                >
                  <ArrowUp stroke="#7C56FE" />
                  Send
                </div>
                <div
                  // onClick={() => handleSwapPoints(amount)}
                  onClick={() => setSwapTx(true)}
                  className="cursor-pointer w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]"
                >
                  <ArrowDownUp stroke="#7C56FE" />
                  Swap
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
                  Tokens
                </p>
                <p
                  onClick={() => setShowWallet(false)}
                  className={clsx(
                    "w-full text-center py-3 text-black bg-[#7C56FE] rounded-[16px]",
                    showWallet && "text-black bg-[inherit]"
                  )}
                >
                  Activiy
                </p>
              </div>

              <div className="w-[inherit]">
                {showWallet ? (
                  <>
                    <div className="flex flex-col gap-4 mt-6">
                      {/* // points */}
                      <div className="flex flex-row items-center justify-between p-3 border border-[#D6CBFF] rounded-[12px]">
                        <div className="flex flex-row items-center justify-center gap-2">
                          <div className="w-[35px] h-[35px] flex items-center ">
                            <Image
                              width={35}
                              height={35}
                              src={"/images/ribbon.svg"}
                              alt="coin logo"
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <p className="text-base font-normal">PTS</p>
                            <p className="text-xs text-[#626262]">
                              {pointName}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm">{point} points</p>
                      </div>
                      {/* // world */}
                      <div className="flex flex-row items-center justify-between p-3 border border-[#D6CBFF] rounded-[12px]">
                        <div className="flex flex-row items-center justify-center gap-2">
                          <div className="w-[35px] h-[35px] flex items-center ">
                            <Image
                              width={35}
                              height={35}
                              src={"/images/world-coin.png"}
                              alt="coin logo"
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <p className="text-base font-normal">
                              {worldTokenName}
                            </p>
                            <p className="text-xs text-[#626262]">
                              {worldTokenName}
                            </p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="text-sm font-normal">{wldToken} WLD</p>
                          <p className="text-xs text-[#626262]">
                            {Number(wldToken) * 4.8} USD
                          </p>
                        </div>
                      </div>
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
          </div>
        </>
      ) : (
        <div className="flex flex-col p-4 sm:p-6 h-screen bg-cover bg-walletBg">
          <div className="mb-6">
            <BackArrowButton stroke="#FFF" />
            <div className="flex -mt-10 text-white  flex-row items-center justify-center text-base font-semibold">
              Wallet
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-evenly text-white">
            <div className="w-[212px] h-[232px]">
              {/* <Image src="" alt="" height={212} width={232} /> */}
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-10">
              <div className="flex flex-col gap-1.5">
                <p className="text-3xl font-bold">
                  Manage Your Crypto Assets Easily
                </p>
                <p className="text-sm">
                  Monitor and manage crypto portfolio with Ribbon Protocol
                </p>
              </div>
              <button
                onClick={login}
                className="flex flex-row gap-3 items-center justify-center px-6 py-2 w-fit bg-white text-[#7C56FE] font-medium rounded-md hover:bg-[#c0b7df] mr-2 mt-4"
              >
                Connect wallet <WalletMoney />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div> */}
    </>
  );
};

export default Wallet;
