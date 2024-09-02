"use client";

import useSWR from "swr";
import {
  UX_MODE,
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
  OpenloginLoginParams,
} from "@web3auth/openlogin-adapter";
import Web3 from "web3";
import clsx from "clsx";
import Image from "next/image";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useGetAuth } from "@/api/auth";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { shorten } from "@/lib/utils/shorten";
import { copyToClipboard } from "@/lib/utils";
import { fetcher } from "@/lib/values/priceAPI";
import SwapPointToWorldToken from "./swap-points";
import WithdrawWorldToken from "./withdraw-token";
import ClaimPointsModal from "./claim-point-modal";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { Copy, Logout, Wallet2 } from "iconsax-react";
import { convertPoints } from "@/lib/utils/convertPoint";
import { SpinnerIcon } from "@/components/icons/spinner";
import WithdrawalProcessing from "./withdrawal-processing";
import TokenTxUI from "@/components/wallet/wld-token-tx-ui";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import BackArrowButton from "@/components/button/back-arrow";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import PointsTokenTxUI from "@/components/wallet/point-token-tx-ui";
import { BigNumber } from "bignumber.js"; // Import BigNumber library
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { useClaimPoints, useSwapPoints, useWithdrawPoints } from "@/api/user";
import SwapPointToUsdcToken from "./swap-points";

const pointsABI = require("./contract/pointsABI.json");

const config = {
  biconomyPaymasterApiKey:
    "https://paymaster.biconomy.io/api/v1/11155420/aS0A_slW9.c8557306-0d4d-45ac-a178-544c2891e4ac",
  bundlerUrl:
    "https://bundler.biconomy.io/api/v2/11155420/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44", // <-- Read about this at https://docs.biconomy.io/dashboard#bundler-url
};

const chainId = 11155420;
// const rpcTarget = "https://sepolia.base.org/";
const rpcTarget =
  "https://base-sepolia.g.alchemy.com/v2/fw6todGL-HqWdvvhbGrx_nXxROeQQIth";
const publicRPC = "https://sepolia.optimism.io/";

const clientId =
  "BDvkOwqV1M9hoobZcrFN8HFkqg9efsMiDpML7Tmu_uFlVOPNjXrUmKXvFBFidDhn9fmbJ1HJ1v4OsANeC_mg5f0";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14a34", // 84532
  displayName: "Base Sepolia",
  tickerName: "ETH",
  ticker: "ETH",
  rpcTarget: rpcTarget,
  blockExplorerUrl: "https://sepolia-explorer.base.org/",
  logo: "https://icons.llamao.fi/icons/chains/rsz_optimism.jpg",
};

const WalletComponent = () => {
  const router = useRouter();

  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);

  const [provider, setProvider] = useState<IProvider | null | undefined>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState<Partial<OpenloginUserInfo>>();
  const [balance, setBalance] = useState("");

  const [address, setAddress] = useState("");

  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");

  const [signer, setsigner] = useState<any>("");

  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });
        const web3auth = new Web3AuthNoModal({
          clientId,
          // web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider,
        });

        // MFA / backup share for wallet
        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: true,
              },
            },
          },
          loginSettings: {
            mfaLevel: "optional",
          },
          privateKeyProvider,
        });
        web3auth.configureAdapter(openloginAdapter);

        setWeb3Auth(web3auth);
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

  const login = async () => {
    const web3authProvider = await web3auth?.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      { loginProvider: "google" }
    );
    setProvider(web3authProvider);
    if (web3auth?.connected) {
      setLoggedIn(true);
    }
  };

  // authenticate user
  const authenticateUser = async () => {
    if (!web3auth) {
      return;
    }
    try {
      const idToken = await web3auth.authenticateUser();
    } catch (error) {
      // handle error
    }
  };

  // get user info
  const getUserInfo = async () => {
    try {
      const user = await web3auth?.getUserInfo();
      setUserInfo(user);
    } catch (error) {
      // console.error(error); // Web3ValidatorError: Web3 validator found 1 error[s]:value at "/1" is required
    }
  };

  const logout = async () => {
    if (!web3auth) {
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  // get user accounts
  const getAccounts = async () => {
    if (!provider) {
      return;
    }

    try {
      const web3 = new Web3(provider as any);

      const accounts = await web3.eth.getAccounts();
      setAddress(accounts[0] || "");
    } catch (error) {
      // console.error(error);
    }
  };

  // get wallet balance
  const getBalance = async () => {
    if (!provider) {
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
      // console.error(error);
    }
  };

  // get smart contract address
  const [SAAddress, setSAAddress] = useState("");
  localStorage.setItem("address", SAAddress);

  const getSAAdsress = async () => {
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

      setSAAddress(saAddress);
    } catch (error: any) {
      // error
    }
  };

  const spender = address;
  const [claimValue, setClaimValue] = useState("10000");

  const {
    mutate: claimPoints,
    isPending: claimPointsPending,
    data: claimPointsData,
  } = useClaimPoints();

  const { mutate: withdrawPoints, isPending: withdrawIsPending } =
    useWithdrawPoints();

  const pendingClaim = claimPointsPending || withdrawIsPending;

  const onClaimPointsSuccess = (claimPointsData: any) => {
    toast.success("Please wait while transaction resolves");
    usersClaimPoints(claimPointsData);
  };

  const onWithdrawSuccess = () => {
    setShowClaimModal(false), setShowPending(false), setClaimValue("0");
    toast.success("Points claimed");
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

      //  @ts-ignore
      const interfacedata = new ethers.utils.Interface([
        "function permitClaimPoints(address user,uint amount,uint256 deadline,uint8 v,bytes32 r,bytes32 s)",
      ]);
      const data = interfacedata?.encodeFunctionData("permitClaimPoints", [
        saAddress,
        convertPoints(Number(claimValue)) as string,
        claimPointsData?.data?.deadline,
        claimPointsData?.data?.v,
        claimPointsData?.data?.r as string,
        claimPointsData?.data?.s as string,
      ]);

      // @ts-ignore
      const userOpResponse = await smartWallet.sendTransaction(
        {
          to: claimPointsData?.data?.vaultAddress,
          data: data,
        },
        {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        }
      );

      const { transactionHash } = await userOpResponse.waitForTxHash();

      const userOpReceipt = await userOpResponse.wait();

      if (userOpReceipt.success == "true") {
        withdrawPoints(
          { amount: Number(claimValue) },
          { onSuccess: onWithdrawSuccess }
        );
      } else {
        setShowPending(false), toast.error("An error occured");
      }
    } catch (err) {
      setShowPending(false), toast.error("An error occured");
      return;
    }
  };

  const [swapValue, setSwapValue] = useState(10000);

  const {
    mutate: swapPoints,
    isPending,
    data: swapPointsData,
  } = useSwapPoints();

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

      const spender = address;
      const vaultAddress = swapPointsData?.data?.vaultAddress;

      //  @ts-ignore
      const interfacedata = new ethers.utils.Interface([
        "function permitSwapToPaymentCoin(address user,uint amount,uint256 deadline,uint8 v,bytes32 r,bytes32 s)",
      ]);
      const data = interfacedata.encodeFunctionData("permitSwapToPaymentCoin", [
        saAddress,
        convertPoints(swapValue) as string,
        swapPointsData?.data?.deadline,
        swapPointsData?.data?.v,
        swapPointsData?.data?.r,
        swapPointsData?.data?.s,
      ]);

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

      const { transactionHash } = await userOpResponse.waitForTxHash();

      const userOpReceipt = await userOpResponse.wait();

      if (userOpReceipt.success == "true") {
        setShowPending(false), toast.success("Transaction successful");
      } else {
        setShowPending(false), toast.error("An error occured");
      }
    } catch (err) {
      setShowPending(false), toast.error("An error occured");
      return;
    }
  };

  // send transaction
  const sendUSDCToken = async (destination: any, amount: any) => {
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

      //  @ts-ignore
      const interfacedata = new ethers.utils.Interface([
        "function transfer(address to, uint256 value)",
      ]);
      const data = interfacedata?.encodeFunctionData("transfer", [
        destination,
        amount as string,
      ]);

      // @ts-ignore
      const userOpResponse = await smartWallet.sendTransaction(
        {
          to: "0x036cbd53842c5426634e7929541ec2318f3dcf7e",
          data: data,
        },
        {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        }
      );

      const { transactionHash } = await userOpResponse.waitForTxHash();

      const userOpReceipt = await userOpResponse.wait();

      if (userOpReceipt.success == "true") {
        setShowPending(false), toast.success("Transaction successful");
      } else {
        setShowPending(false), toast.error("An error occured");
      }
    } catch (err) {
      setShowPending(false), toast.error("An error occured");
      return;
    }
  };

  // points token
  const [point, setPoint] = useState("");
  const [pointName, setPointName] = useState("");

  const getPointToken = async () => {
    try {
      const web3 = new Web3(provider as any);
      // const web3 = new Web3("https://optimism.drpc.org/");

      const myaddress = (await web3.eth.getAccounts())[0];

      const ADDRESS = "0x28B841ab4C9fAD21ee837a66d8F533FF97CecaFF";

      const contract = new web3.eth.Contract(pointsABI, ADDRESS);

      const number: string = await contract.methods.balanceOf(SAAddress).call();
      const decimal: number = await contract.methods.decimals().call();

      const numberBig: BigNumber = new BigNumber(number);
      const divisor: BigNumber = new BigNumber(10).pow(decimal);

      const result: BigNumber = numberBig.dividedBy(divisor);
      setPoint(result.toString());

      const tokenName: string = await contract.methods.name().call();
      setPointName(tokenName);
    } catch (error) {
      // toast.error(`Error sending transaction`);
    }
  };

  const onSwapPointsSuccess = (swapPointsData: any) => {
    usersSwapPoints(swapPointsData);
    setSwapTx(false);
    setSwapValue(0);
  };
  const pointToWLD = Number(point) / 5000;

  // world token
  const [usdcToken, setUsdcToken] = useState("");
  const [usdcTokenName, setusdcTokenName] = useState("");
  localStorage.setItem("usdcTokenBalance", usdcToken);

  const getWorldToken = async () => {
    try {
      const web3 = new Web3(provider as any);

      const myaddress = (await web3.eth.getAccounts())[0];

      const ADDRESS = "0x036cbd53842c5426634e7929541ec2318f3dcf7e";

      const contract = new web3.eth.Contract(pointsABI, ADDRESS);

      const number: string = await contract.methods.balanceOf(SAAddress).call();
      const decimal: number = await contract.methods.decimals().call();

      const numberBig: BigNumber = new BigNumber(number);
      const divisor: BigNumber = new BigNumber(10).pow(decimal);

      const result: BigNumber = numberBig.dividedBy(divisor);
      setUsdcToken(result.toString());

      const tokenName: string = await contract.methods.name().call();
      setusdcTokenName(tokenName);
    } catch (error) {
      // toast.error(`Error sending transaction`);
    }
  };

  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    const handleClick = () => {
      setClickCount((prevCount) => prevCount + 1);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    getUserInfo();
    getAccounts();
    getBalance();
    getSAAdsress();
  }, [authenticateUser(), clickCount]);

  useEffect(() => {
    getPointToken();
    getWorldToken();
  }, [point, usdcToken, pointName, usdcTokenName, authenticateUser()]);

  const [showWallet, setShowWallet] = useState(true);

  const [sendTx, setSendTx] = useState(false);
  const [swapTx, setSwapTx] = useState(false);

  // const [pointsToSwap, setPointsToSwap] = useState("");

  const [openPointTxPage, setOpenPointTxPage] = useState(false);
  const [openWLDTxPage, setOpenWLDTxPage] = useState(false);
  const [openOPSepoiliaTxPage, setOpenOPSepoiliaTxPage] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const useCoinDetails = () => {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/usd-coin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;

    const { isLoading, error, data } = useSWR(apiUrl, fetcher);

    return {
      isLoading,
      error,
      data,
    };
  };

  const { data } = useCoinDetails();
  const currentPrice = data?.market_data.current_price.usd as number;

  const { data: user } = useGetAuth({ enabled: true });
  const virtualBalance = user?.wallet.balance;
  const virtualPointBalance = virtualBalance * 5000;

  return (
    <>
      {loggedIn ? (
        <>
          <div className="min-h-screen bg-[inherit] flex flex-col">
            <div className="mb-6">
              <ArrowLeft
                stroke="#939393"
                onClick={() => router.push("/dashboard")}
                className="flex w-[40px] cursor-pointer"
              />

              <div className="flex -mt-10 text-black  flex-row items-center justify-center text-base font-semibold">
                {userInfo?.name?.split(" ")[1]}&apos;s Wallet
              </div>
            </div>
            {/* show pending tx */}
            <div>
              {showPending && (
                <WithdrawalProcessing
                  isOpen={showPending}
                  closeModal={() => {
                    setShowPending(false),
                      toast.success("Transaction successful");
                  }}
                />
              )}
            </div>

            {/* open claim modal */}
            <div>
              {showClaimModal && (
                <ClaimPointsModal
                  isOpen={showClaimModal}
                  closeModal={() => setShowClaimModal(false)}
                  handleClick={() => {
                    setShowClaimModal(false);
                    setShowPending(true),
                      toast.success("Transaction initiated");
                    claimPoints(
                      {
                        amount: convertPoints(Number(claimValue)),
                        address: SAAddress,
                      },
                      { onSuccess: onClaimPointsSuccess }
                    );
                  }}
                  setMaxAmount={() =>
                    setClaimValue(virtualPointBalance.toString())
                  }
                  pointInput={claimValue}
                  handlePointInput={(e: any) => setClaimValue(e.target.value)}
                  isPending={pendingClaim}
                  pointsBalance={virtualPointBalance}
                />
              )}
            </div>

            {/* // swap points modal */}
            <div>
              {swapTx && (
                <SwapPointToUsdcToken
                  isOpen={swapTx}
                  isPending={isPending}
                  pointInput={swapValue}
                  setMaxAmount={() => setSwapValue(Number(point))}
                  USDvalue={(Number(swapValue) / 5000) * currentPrice}
                  pointsBalance={point}
                  usdcBalance={usdcToken}
                  closeModal={() => setSwapTx(false)}
                  handleClick={() => {
                    swapPoints(
                      {
                        amount: convertPoints(Number(swapValue)),
                        address: SAAddress,
                      },
                      { onSuccess: onSwapPointsSuccess }
                    );
                    setShowPending(true),
                      toast.success("Transaction initiated");
                  }}
                  handlePointInput={(e: any) => setSwapValue(e.target.value)}
                />
              )}
            </div>

            {/* withdraw world token */}
            <div>
              {sendTx && (
                <WithdrawWorldToken
                  isOpen={sendTx}
                  closeModal={() => setSendTx(false)}
                  handleClick={() => {
                    setShowPending(true),
                      toast.success("Transaction initiated"),
                      sendUSDCToken(destination, convertPoints(Number(amount)));
                    setSendTx(false);
                    setDestination("");
                    setAmount("");
                  }}
                  destination={destination}
                  handleDestinationInput={(e: any) =>
                    setDestination(e.target.value)
                  }
                  amount={amount}
                  handleAmountInput={(e: any) => setAmount(e.target.value)}
                  isPending={undefined}
                  usdcTokenBalance={usdcToken}
                  USDvalue={Number(amount) * currentPrice}
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
                  wldBalance={usdcToken}
                  tokenName={"Usdc (USDC)"}
                  tokenUnit={"USDC"}
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
              <div className="mt-4">
                <p className="text-center mb-1">Your smart account is below</p>
                <div className="flex flex-row gap-5 items-center justify-center ">
                  <p className="text-[16px]">{shorten(SAAddress)}</p>
                  <Copy
                    size="18"
                    color="#F6F1FE"
                    variant="Bold"
                    className="cursor-pointer"
                    onClick={() => {
                      copyToClipboard(SAAddress, () =>
                        toast.success(`Wallet address copied`)
                      );
                    }}
                  />
                </div>
              </div>

              <CustomTokenUI
                wldTokenBalance={usdcToken}
                balanceUSD={(Number(usdcToken) * currentPrice).toFixed(5)}
              />

              <button
                onClick={() => setShowClaimModal(true)}
                className={clsx(
                  "mt-5 w-full text-center py-3 text-white font-semibold bg-[#7C56FE] rounded-[16px]",
                  pendingClaim && "bg-gray-300"
                )}
              >
                {pendingClaim ? (
                  <div className="flex self-center items-center justify-center">
                    <SpinnerIcon />
                  </div>
                ) : (
                  "Claim points"
                )}
              </button>

              <div className="w-full pt-5 pb-10 flex gap-4 items-center justify-between text-xs font-bold">
                <div
                  onClick={() => setSendTx(true)}
                  className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
                >
                  <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
                    <ArrowUp stroke="#7C56FE" />
                  </div>
                  Send
                </div>

                <div
                  onClick={() => router.push("/wallet/receive")}
                  className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
                >
                  <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
                    <ArrowDown stroke="#7C56FE" />
                  </div>
                  Recieve
                </div>

                <div
                  onClick={() => setSwapTx(true)}
                  className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
                >
                  <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
                    <ArrowDownUp stroke="#7C56FE" />
                  </div>
                  Swap
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
                  Tokens
                </p>
                <p
                  onClick={() => setShowWallet(false)}
                  className={clsx(
                    "w-full text-center py-3 text-black bg-[#7C56FE] rounded-[16px]",
                    showWallet && "text-black bg-[inherit]"
                  )}
                >
                  Activity
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
                              alt="coin logo"
                              className="rounded-full bg-white"
                              src={"/assets/ribbon.svg"}
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
                              alt="coin logo"
                              className="rounded-full bg-white"
                              src={"/assets/usdc.png"}
                            />
                          </div>
                          <div>
                            <p className="text-base font-normal">
                              {usdcTokenName}
                            </p>
                            <p className="text-xs text-[#626262]">
                              {usdcTokenName}
                            </p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="text-sm font-normal">
                            {usdcToken} USDC
                          </p>
                          <p className="text-xs text-[#626262]">
                            {Number(usdcToken) * currentPrice} USD
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex my-20 items-center justify-center">
                      <button
                        onClick={logout}
                        className="flex flex-row items-center justify-center gap-2 px-4 py-2 w-fit font-semibold text-red-500 rounded hover:bg-red-300 mr-2 mt-4"
                      >
                        Log out wallet <Logout />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center flex items-center justify-center mt-6 h-[200px]">
                    Your list of transactions will be displayed here
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-screen">
          <div className="mb-6">
            <BackArrowButton stroke="#FFF" />
            <div className="flex -mt-10 text-white  flex-row items-center justify-center text-base font-semibold">
              Wallet
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-evenly text-white">
            <div className="w-[212px] h-[150px]"></div>
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
                Login wallet <Wallet2 />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletComponent;
