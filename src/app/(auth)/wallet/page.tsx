"use client";

import {
  IProvider,
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import {
  IPaymaster,
  PaymasterMode,
  createPaymaster,
  createSmartAccountClient,
} from "@biconomy/account";
import {
  OpenloginAdapter,
  OpenloginUserInfo,
} from "@web3auth/openlogin-adapter";
import Web3 from "web3";
import clsx from "clsx";
import Image from "next/image";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WalletMoney } from "@/public/images";
import { shorten } from "@/lib/utils/shorten";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { convertPoints } from "@/lib/utils/convertPoint";
import { useClaimPoints, useSwapPoints } from "@/api/user";
import TokenTxUI from "@/components/wallet/wld-token-tx-ui";
import BackArrowButton from "@/components/button/back-arrow";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import SwapPointToWorldToken from "@/components/modal/swap-points";
import WithdrawWorldToken from "@/components/modal/withdraw-token";
import PointsTokenTxUI from "@/components/wallet/point-token-tx-ui";
import { BigNumber } from "bignumber.js"; // Import BigNumber library
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { copyToClipboard } from "@/lib/utils";

const pointsABI = require("../contract/pointsABI.json");

const config = {
  biconomyPaymasterApiKey:
    "https://paymaster.biconomy.io/api/v1/11155420/aS0A_slW9.c8557306-0d4d-45ac-a178-544c2891e4ac",
  bundlerUrl:
    "https://bundler.biconomy.io/api/v2/11155420/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44", // <-- Read about this at https://docs.biconomy.io/dashboard#bundler-url
};

const chainId = 11155420;
const rpcTarget =
  "https://opt-sepolia.g.alchemy.com/v2/fw6todGL-HqWdvvhbGrx_nXxROeQQIth";

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
  // rpcTarget: "https://optimism-sepolia.drpc.org",
  rpcTarget: rpcTarget,
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
  const [balance, setBalance] = useState("");

  const [address, setAddress] = useState("");
  localStorage.setItem("address", address);

  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");

  const [signer, setsigner] = useState<any>("");

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }

        const ethersProvider = new ethers.providers.Web3Provider(
          web3auth.provider as any
        );

        const web3AuthSigner = ethersProvider.getSigner();
        setsigner(web3AuthSigner);
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
    try {
      const idToken = await web3auth.authenticateUser();
    } catch (error) {
      console.log("error processing");
    }
  };

  // get user accounts
  const getAccounts = async () => {
    if (!provider) {
      console.error("Provider not initialized yet");
      return;
    }

    try {
      const web3 = new Web3(provider as any);

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

    try {
      const web3 = new Web3(provider as any);
      const accounts = await web3.eth.getAccounts();

      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );
      setBalance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  // send native transaction
  const sendNativeTransaction = async (destination: string, amount: any) => {
    try {
      const web3 = new Web3(provider as any);

      const fromAddress = (await web3.eth.getAccounts())[0];

      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: web3.utils.toWei(amount, "ether"),
        gasPrice: "20000000000",
        gas: "21000",
      });

      console.log("Transaction sent:", receipt);
    } catch (error: any) {
      console.error("Error sending transaction:", error);
    }
  };

  const spender = address;
  const claimValue = 10000;

  const { mutate: claimPoints, data: claimPointsData } = useClaimPoints();

  const onClaimPointsSuccess = (claimPointsData: any) => {
    usersClaimPoints(claimPointsData);
  };

  // usersClaimPointsFromVirtualWallet
  const usersClaimPoints = async (claimPointsData: any) => {
    const web3 = new Web3(provider as any);

    try {
      const paymaster: IPaymaster = await createPaymaster({
        paymasterUrl: config.biconomyPaymasterApiKey,
        strictMode: true,
      });

      const smartWallet = await createSmartAccountClient({
        //@ts-ignore
        signer: signer,
        chainId: chainId,
        paymaster,
        bundlerUrl: config.bundlerUrl,
        rpcUrl: rpcTarget,
      });
      const saAddress = await smartWallet.getAccountAddress();
      console.log("SA Address", saAddress);

      //  @ts-ignore
      const interfacedata = new ethers.utils.Interface([
        "function permitClaimPoints(address user,uint amount,uint256 deadline,uint8 v,bytes32 r,bytes32 s)",
      ]);
      const data = interfacedata?.encodeFunctionData("permitClaimPoints", [
        spender,
        convertPoints(claimValue) as string,
        claimPointsData?.data?.deadline,
        claimPointsData?.data?.v,
        claimPointsData?.data?.r as string,
        claimPointsData?.data?.s as string,
      ]);

      // @ts-ignore
      const userOpResponse = await smartWallet.sendTransaction(
        {
          to: "0x8ebBE4b3bABeED275c2eCd0F04Ec46368EC24379",
          data: data,
        },
        {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        }
      );

      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);

      const userOpReceipt = await userOpResponse.wait();

      if (userOpReceipt.success == "true") {
        console.log("UserOp receipt", userOpReceipt);
        console.log("Transaction receipt", userOpReceipt.receipt);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const swapValue = 10000;
  const {
    mutate: swapPoints,
    isPending,
    data: swapPointsData,
  } = useSwapPoints();

  const onSwapPointsSuccess = (swapPointsData: any) => {
    usersSwapPoints(swapPointsData);
  };

  // usersSwapPointsForWld
  const usersSwapPoints = async (swapPointsData: any) => {
    const web3 = new Web3(provider as any);

    try {
      const paymaster: IPaymaster = await createPaymaster({
        paymasterUrl: config.biconomyPaymasterApiKey,
        strictMode: true,
      });

      const smartWallet = await createSmartAccountClient({
        //@ts-ignore
        signer: signer,
        chainId: chainId,
        paymaster,
        bundlerUrl: config.bundlerUrl,
        rpcUrl: rpcTarget,
      });
      const saAddress = await smartWallet.getAccountAddress();
      console.log("SA Address", saAddress);

      const spender = address;
      const vaultAddress = swapPointsData?.data?.vaultAddress;

      //  @ts-ignore
      const interfacedata = new ethers.utils.Interface([
        "function permitSwapToPaymentCoin(address user,uint amount,uint256 deadline,uint8 v,bytes32 r,bytes32 s)",
      ]);
      const data = interfacedata.encodeFunctionData("permitSwapToPaymentCoin", [
        spender,
        convertPoints(swapValue) as string,
        swapPointsData?.data?.deadline,
        swapPointsData?.data?.v,
        swapPointsData?.data?.r,
        swapPointsData?.data?.s,
      ]);

      console.log(
        "passed>>>>>>>>>>>",
        spender,
        convertPoints(swapValue) as string,
        swapPointsData?.data
      );

      // @ts-ignore
      const userOpResponse = await smartWallet.sendTransaction(
        {
          to: vaultAddress,
          data: data,
        },
        {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        }
      );

      console.log(
        "passed>>>>>>>>>>>",
        spender,
        convertPoints(swapValue) as string,
        swapPointsData?.data
      );

      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);
      const userOpReceipt = await userOpResponse.wait();

      if (userOpReceipt.success == "true") {
        console.log("UserOp receipt", userOpReceipt);
        console.log("Transaction receipt", userOpReceipt.receipt);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // send transaction
  const sendWorldToken = async (destination: any, amount: any) => {
    try {
      const web3 = new Web3(provider as any);

      const address = await web3.eth.getAccounts();

      const contract = new web3.eth.Contract(
        JSON.parse(JSON.stringify(pointsABI)),
        "0x04EC0289FC8ddAE121C0588f62dAe0fa3EE362d5"
      );

      const txData = contract.methods
        // .transfer(
        //   "0x1d9aa22b610d401f3884c55ebB1477173eCEf63F",
        //   "10000000000000000000"
        // )
        .transfer(destination, amount)
        .send({
          from: address[0],
        });
    } catch (error) {
      toast.error("Error sending transaction");
    }
  };

  // points token
  const [point, setPoint] = useState("");
  const [pointName, setPointName] = useState("");

  const getPointToken = async () => {
    try {
      const web3 = new Web3(provider as any);

      const myaddress = (await web3.eth.getAccounts())[0];

      const ADDRESS = "0x904C01A63d8122e6829DF8c96f1ed1854e8b757B";

      const contract = new web3.eth.Contract(pointsABI, ADDRESS);

      const number: string = await contract.methods.balanceOf(myaddress).call();
      const decimal: number = await contract.methods.decimals().call();

      const numberBig: BigNumber = new BigNumber(number);
      const divisor: BigNumber = new BigNumber(10).pow(decimal);

      const result: BigNumber = numberBig.dividedBy(divisor);
      setPoint(result.toString());

      const tokenName: string = await contract.methods.name().call();
      setPointName(tokenName);
    } catch (error) {
      console.error("Error sending transaction:", error);
      // toast.error(`Error sending transaction`);
    }
  };
  const pointToWLD = Number(point) / 5000;
  getPointToken();

  // world token
  const [wldToken, setWldToken] = useState("");
  const [worldTokenName, setWorldTokenName] = useState("");
  localStorage.setItem("wldTokenBalance", wldToken);

  const getWorldToken = async () => {
    try {
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
    } catch (error) {
      console.error("Error sending transaction:", error);
      // toast.error(`Error sending transaction`);
    }
  };
  getWorldToken();

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

  const [showWallet, setShowWallet] = useState(true);

  const [sendTx, setSendTx] = useState(false);
  const [swapTx, setSwapTx] = useState(false);
  const [sendNativeTx, setSendNativeTx] = useState(false);

  const [pointsToSwap, setPointsToSwap] = useState("");

  const [openPointTxPage, setOpenPointTxPage] = useState(false);
  const [openWLDTxPage, setOpenWLDTxPage] = useState(false);
  const [openOPSepoiliaTxPage, setOpenOPSepoiliaTxPage] = useState(false);

  return (
    <>
      {loggedIn ? (
        <>
          <div className="p-4 sm:p-6 min-h-screen bg-white flex flex-col">
            <div className="mb-6">
              <BackArrowButton stroke="#939393" />
              <div className="flex -mt-10 text-black  flex-row items-center justify-center text-base font-semibold">
                {userInfo?.name?.split(" ")[1]}`&apos;`s Wallet
              </div>
            </div>

            {/* // swap points modal */}
            <div>
              {swapTx && (
                <SwapPointToWorldToken
                  isOpen={swapTx}
                  isPending={isPending}
                  pointInput={pointsToSwap}
                  pointsBalance={point}
                  wldBalance={wldToken}
                  closeModal={() => setSwapTx(false)}
                  handleClick={() => {
                    swapPoints(
                      {
                        amount: convertPoints(claimValue),
                        address: address as string,
                      },
                      { onSuccess: onSwapPointsSuccess }
                    );
                  }}
                  handlePointInput={(e) => setPointsToSwap(e.target.value)}
                />
              )}
            </div>

            {/* withdraw world token */}
            <div>
              {sendTx && (
                <WithdrawWorldToken
                  isOpen={sendTx}
                  closeModal={() => setSendTx(false)}
                  handleClick={() =>
                    sendWorldToken(destination, convertPoints(Number(amount)))
                  }
                  destination={destination}
                  handleDestinationInput={(e) => setDestination(e.target.value)}
                  amount={amount}
                  handleAmountInput={(e) => setAmount(e.target.value)}
                  isPending={undefined}
                  wldTokenBalance={wldToken}
                />
              )}
            </div>

            {/* withdraw native token */}
            <div>
              {sendNativeTx && (
                <WithdrawWorldToken
                  isOpen={sendNativeTx}
                  closeModal={() => setSendNativeTx(false)}
                  handleClick={() =>
                    sendWorldToken(destination, convertPoints(Number(amount)))
                  }
                  destination={destination}
                  handleDestinationInput={(e) => setDestination(e.target.value)}
                  amount={amount}
                  handleAmountInput={(e) => setAmount(e.target.value)}
                  isPending={undefined}
                  wldTokenBalance={balance}
                />
              )}
            </div>

            {/* open point tx interface */}
            <div>
              {openPointTxPage && (
                <PointsTokenTxUI
                  isOpen={openPointTxPage}
                  closeModal={() => setOpenPointTxPage(false)}
                  handleClick={() => setSwapTx(true)}
                  pointBalance={point}
                />
              )}
            </div>

            {/* open WLD tx interface */}
            <div>
              {openWLDTxPage && (
                <TokenTxUI
                  isOpen={openWLDTxPage}
                  closeModal={() => setOpenWLDTxPage(false)}
                  handleClick={() => setSendTx(true)}
                  wldBalance={wldToken}
                  tokenName={"World (WLD)"}
                  tokenUnit={"WLD"}
                />
              )}
            </div>

            {/* open OP Sepolia tx interface */}
            <div>
              {openOPSepoiliaTxPage && (
                <TokenTxUI
                  isOpen={openOPSepoiliaTxPage}
                  closeModal={() => setOpenOPSepoiliaTxPage(false)}
                  // handleClick={() => setSendTx(true)}
                  handleClick={() => {}}
                  wldBalance={balance}
                  tokenName={"OP Sepolia"}
                  tokenUnit={"ETH"}
                />
              )}
            </div>

            <div className="flex flex-col gap-2 mb-10 overflow-hidden">
              <CustomTokenUI
                address={shorten(address)}
                handleCopyAddress={() => {
                  copyToClipboard(address), toast.success(`copied`);
                }}
                // nativeTokenBalance={balance}
                wldTokenBalance={wldToken}
                balanceUSD={"0"}
              />

              <button
                onClick={() => {
                  claimPoints(
                    {
                      amount: convertPoints(claimValue),
                      address: address as string,
                    },
                    { onSuccess: onClaimPointsSuccess }
                  );
                }}
                className="mt-5 w-full text-center py-3 text-white font-semibold bg-[#7C56FE] rounded-[16px]"
              >
                Claim points
              </button>

              {/* <button onClick={() => handleClaimPoints()}>
                Claim endpoint
              </button> */}

              <div className="w-full pt-5 pb-10 flex gap-4 items-center justify-between">
                <div
                  onClick={() => router.push("/wallet/receive")}
                  className="cursor-pointer w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]  "
                >
                  <ArrowDown stroke="#7C56FE" />
                  Recieve
                </div>
                <div
                  onClick={() => setSendTx(true)}
                  // onClick={() => setSendNativeTx(true)}
                  className="cursor-pointer w-full py-6 items-center justify-center flex flex-col gap-3 border border-[#D6CBFF] rounded-[12px]  "
                >
                  <ArrowUp stroke="#7C56FE" />
                  Send
                </div>
                <div
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
                      {/* // points token */}
                      <div
                        onClick={() => setOpenPointTxPage(true)}
                        className="flex flex-row items-center justify-between p-3 border border-[#D6CBFF] rounded-[12px]"
                      >
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

                      {/* // world token */}
                      <div
                        onClick={() => setOpenWLDTxPage(true)}
                        className="flex flex-row items-center justify-between p-3 border border-[#D6CBFF] rounded-[12px]"
                      >
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

                      {/* // native optimism token */}
                      <div
                        onClick={() => setOpenOPSepoiliaTxPage(true)}
                        className="flex flex-row items-center justify-between p-3 border border-[#D6CBFF] rounded-[12px]"
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <div className="w-[35px] h-[35px] flex items-center ">
                            <Image
                              width={35}
                              height={35}
                              src={"/images/optimism.png"}
                              alt="coin logo"
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <p className="text-base font-normal">OP Sepolia</p>
                            <p className="text-xs text-[#626262]">ETH</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="text-sm font-normal">{balance} ETH</p>
                          <p className="text-xs text-[#626262]">0 USD</p>
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
