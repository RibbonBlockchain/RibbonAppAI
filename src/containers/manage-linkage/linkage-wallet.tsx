import {
  Copy,
  Share,
  ArrowUp,
  ArrowDown,
  InfoCircle,
  ClipboardText,
  Add,
} from "iconsax-react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import { useUserBaseTransactions } from "@/api/user";
import { useUsdcCoinDetails } from "@/lib/values/priceAPI";
import TransactionHistory from "./transaction-history";
import { useLinkageGetOnramp, useLinkageSendUsdcToken } from "@/api/linkage";
import { SpinnerIcon } from "@/components/icons/spinner";
import SuccessAnimation from "@/components/success-animation";
import AddressDisplay from "@/components/wallet/address-display";
import WithdrawUSDCToken from "@/containers/wallet/withdraw-token";
import Basenames from "@/app/(auth)/personalize/basenames";

const LinkageWallet = ({
  linkageId,
  walletAddress,
  walletBalance,
  walletConvertedBalance,
  baseName,
  refetch,
}: {
  linkageId: number;
  walletAddress: any;
  walletBalance: string;
  walletConvertedBalance: any;
  baseName: string;
  refetch: () => void;
}) => {
  const [selected, setSelected] = useState("deposit");
  const [openTx, setOpenTx] = useState(false);

  const [destinationWallet, setDestinationWallet] = useState("");
  const [amount, setAmount] = useState("");

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const { mutate, isPending } = useLinkageSendUsdcToken();
  const sendUsdcToken = () => {
    mutate(
      { body: { address: destinationWallet, amount: amount }, id: linkageId },
      {
        onSuccess: () => {
          refetch();
          toast.success("Transaction successful");
          setShowSuccessAnimation(true);
          setOpenTx(false);
        },
        onError: () => {
          refetch();
          setOpenTx(false);
        },
      }
    );
  };

  const { data: linkageOnramp } = useLinkageGetOnramp(linkageId);
  const onrampUrl = linkageOnramp?.url;

  const {
    mutate: getTxnHistory,
    data: transactionHistory,
    isPending: getTxPending,
  } = useUserBaseTransactions();

  const { data } = useUsdcCoinDetails();
  const currentPrice = data?.market_data.current_price.usd as number;

  const handleClick = () => {
    navigator.clipboard
      .writeText(walletAddress as string)
      .then(() => {
        toast.success("address copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Could not copy text");
      });
  };

  useEffect(() => {
    if (walletAddress) {
      getTxnHistory({ address: walletAddress });
    }
  }, [walletAddress, getTxnHistory]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-2 items-center justify-center text-white mb-4 text-base font-semibold">
          <Image alt="coin" width={24} height={24} src="/assets/BASE.svg" />{" "}
          Base Wallet
        </div>

        {baseName ? (
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="flex flex-row gap-2 items-center justify-center ">
              <Basenames address={walletAddress} />
              <Copy
                size="18"
                color="#F6F1FE"
                variant="Bold"
                className="cursor-pointer"
                onClick={() => {
                  copyToClipboard(walletAddress, () =>
                    toast.success(`Wallet address copied`)
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-4 ">
            <div className="flex flex-row gap-2 items-center justify-center ">
              <p className="text-[16px]">{shorten(walletAddress)}</p>
              <Copy
                size="18"
                color="#F6F1FE"
                variant="Bold"
                className="cursor-pointer"
                onClick={() => {
                  copyToClipboard(walletAddress, () =>
                    toast.success(`Wallet address copied`)
                  );
                }}
              />
            </div>

            <Link
              href={"/linkages/personalize"}
              className="text-xs font-normal py-1 px-2 border border-[#CBBEF780] rounded-full"
            >
              Personalize
            </Link>
          </div>
        )}

        <p className="text-[28px] font-bold">$ {walletConvertedBalance}</p>
      </div>

      <div className="flex flex-row items-center justify-around font-bold border-b border-[#FFFFFF36] pb-4">
        <div
          onClick={() => setSelected("deposit")}
          className={clsx(
            "flex flex-col items-center justify-center gap-3 text-sm text-center py-1 rounded-full"
          )}
        >
          <div className="bg-[#3f3856] p-3 rounded-full">
            <ArrowDown size={20} />
          </div>
          Deposit
        </div>

        <div
          onClick={() => {
            setSelected("send"), setOpenTx(true);
          }}
          className={clsx(
            "flex flex-col items-center justify-center gap-3 text-sm text-center py-1 rounded-full"
          )}
        >
          <div className="bg-[#3f3856] p-3 rounded-full">
            <ArrowUp size={20} />
          </div>
          Send
        </div>

        {onrampUrl ? (
          <Link
            href={onrampUrl}
            className={clsx(
              "flex flex-col items-center justify-center gap-3 text-sm text-center py-1 rounded-full"
            )}
          >
            <div className="bg-[#3f3856] p-3 rounded-full">
              <Add size={20} />
            </div>
            Buy USDC
          </Link>
        ) : (
          <Link
            href={"#"}
            className={clsx(
              "cursor-not-allowed flex flex-col items-center justify-center gap-3 text-sm text-center py-1 rounded-full"
            )}
          >
            <div className="bg-[#3f3856] p-3 rounded-full">
              <Add size={20} />
            </div>
            Buy USDC
          </Link>
        )}

        <div
          onClick={() => {
            setSelected("history"), getTxnHistory({ address: walletAddress });
          }}
          className={clsx(
            "flex flex-col items-center justify-center gap-3 text-sm text-center py-1 rounded-full"
          )}
        >
          <div className="bg-[#3f3856] p-3 rounded-full">
            <ClipboardText size={20} />
          </div>
          History
        </div>
      </div>

      <div className="mt-2">
        {selected === "send" && (
          <div className="w-full min-h-[300px] flex items-center justify-center text-sm"></div>
        )}

        {selected === "deposit" && (
          <div className="flex flex-col gap-4 items-center justify-center mx-auto">
            <div className="px-2 flex flex-row gap-2 text-[11px] text-[#98A2B3] max-w-[351px]">
              <InfoCircle size="16" color="#ffffff" />
              Only send USDC (Base Ethereum L2) assets to this address. Other
              assets will be lost forever.
            </div>

            <div className="flex flex-row gap-2 items-center justify-center">
              <Image src="/assets/usdc.png" alt="" width={24} height={24} />
              USDC
            </div>

            <div
              className="flex w-fit flex-col rounded-lg items-center justify-center mx-auto bg-white"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              <QRCode
                value={walletAddress as string}
                size={192}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                className="p-3 rounded-2xl"
              />
              <div className="px-2 py-2 mt-2 text-wrap text-sm flex-wrap text-center text-[#434343]">
                <AddressDisplay address={walletAddress} />
              </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-6 text-sm">
              <div
                onClick={handleClick}
                className="flex flex-col gap-1 items-center"
              >
                <div className="flex items-center px-3 py-3 bg-[#3f3856] rounded-full">
                  <Copy size="20" color="#FFFFFF" />
                </div>
                Copy
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div className="flex items-center px-3 py-3 bg-[#3f3856] rounded-full">
                  <Share size={20} />
                </div>
                Share
              </div>
            </div>
          </div>
        )}

        {selected === "history" && (
          <>
            {getTxPending && (
              <div className="flex items-center justify-center mx-auto h-[120px]">
                <SpinnerIcon />
              </div>
            )}

            {transactionHistory && (
              <TransactionHistory data={transactionHistory?.data} />
            )}
          </>
        )}
      </div>

      {openTx && (
        <WithdrawUSDCToken
          isOpen={openTx}
          closeModal={() => setOpenTx(false)}
          handleClick={sendUsdcToken}
          destination={destinationWallet}
          handleDestinationInput={(e) => setDestinationWallet(e.target.value)}
          amount={amount}
          handleAmountInput={(e) => setAmount(e.target.value)}
          isPending={isPending}
          usdcTokenBalance={walletBalance}
          USDvalue={Number(amount) * currentPrice}
        />
      )}

      {showSuccessAnimation && <SuccessAnimation />}
    </div>
  );
};

export default LinkageWallet;
