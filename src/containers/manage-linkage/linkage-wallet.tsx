import {
  Copy,
  Share,
  ArrowUp,
  ArrowDown,
  InfoCircle,
  ClipboardText,
} from "iconsax-react";
import clsx from "clsx";
import Image from "next/image";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import { useCoinDetails } from "@/lib/values/priceAPI";
import AddressDisplay from "@/components/wallet/address-display";
import WithdrawUSDCToken from "@/containers/wallet/withdraw-token";
import { useGetWalletTransactions, useSendUsdcToken } from "@/api/user";
import Link from "next/link";

const LinkageWallet = ({
  walletAddress,
  walletBalance,
  walletConvertedBalance,
  refetch,
}: {
  walletAddress: string;
  walletBalance: string;
  walletConvertedBalance: any;
  refetch: () => void;
}) => {
  const [selected, setSelected] = useState("deposit");
  const [openTx, setOpenTx] = useState(false);

  const [destinationWallet, setDestinationWallet] = useState("");
  const [amount, setAmount] = useState("");

  const { mutate, isPending } = useSendUsdcToken();
  const sendUsdcToken = () => {
    // mutate(
    //   { address: destinationWallet, amount: amount },
    //   {
    //     onSuccess: () => {
    //       toast.success("Transaction successfull"), setOpenTx(false), refetch();
    //     },
    //   }
    // );
    toast.success("implement function here");
  };

  // const { data: transactionHistory } = useGetWalletTransactions();
  const transactionHistory: any[] = [];

  const { data } = useCoinDetails();
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-4">
          <div
            onClick={() =>
              copyToClipboard(walletAddress, () =>
                toast.success("Wallet address copied")
              )
            }
            className="flex flex-row items-center gap-1 font-normal text-sm"
          >
            {shorten(walletAddress)}
            <Copy size="16" color="#ffffff" variant="Bold" />
          </div>

          <Link
            href={"/my-linkages/personalise"}
            className="text-xs font-normal py-1 px-2 border border-[#CBBEF780] rounded-full"
          >
            Personalise
          </Link>
        </div>

        <p className="text-[28px] font-bold">$ {walletConvertedBalance}</p>
      </div>

      <div className="flex flex-row items-center justify-around font-bold border-b border-[#FFFFFF36] pb-4">
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
          onClick={() => setSelected("history")}
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
          <div className="w-full min-h-[300px] flex items-center justify-center text-sm">
            You can send txs here
          </div>
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
          <div>
            {transactionHistory?.length === 0 ? (
              <div className="w-full min-h-[300px] flex items-center justify-center text-sm">
                Your transaction history will be displayed here
              </div>
            ) : (
              <div className="flex flex-col gap-4 mb-6">
                {transactionHistory
                  ?.filter((tx: any) => tx.status === "complete")
                  .map((tx: any) => (
                    <div
                      key={tx.tx_link}
                      className="flex flex-row items-center justify-between"
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <div className="flex items-center px-3 py-3 bg-[#3f3856] rounded-full">
                          <ArrowUp size={20} />
                        </div>

                        <div className="text-sm">
                          <p className="text-red-500 font-bold">Sent</p>
                          <p className="text-[#98A2B3] font-medium">
                            {shorten(tx.to)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-end text-sm font-medium">
                        <p>-{tx.amount} USDC</p>
                        {/* <p className="text-[#98A2B3]">time</p> */}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
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
    </div>
  );
};

export default LinkageWallet;
