import AddressDisplay from "@/components/wallet/address-display";
import clsx from "clsx";
import QRCode from "qrcode.react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Copy, InfoCircle, Share } from "iconsax-react";
import { Info } from "lucide-react";

const LinkageWallet = () => {
  const [selected, setSelected] = useState("deposit");

  const walletAddress = "0xEFC3571deb12b1bc658d116751C75c8a29B5Ac812";

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
        <p className="text-sm font-normal">Wallet address</p>
        <p className="text-[30px] font-bold">$ wallet balance</p>
      </div>

      <div className="flex flex-row bg-[#3f3856] p-1 rounded-full">
        <p
          onClick={() => setSelected("deposit")}
          className={clsx(
            "w-full text-center py-1 rounded-full",
            selected === "deposit" && " bg-[#0B0228]"
          )}
        >
          Deposit
        </p>
        <p
          onClick={() => setSelected("history")}
          className={clsx(
            "w-full text-center py-1 rounded-full",
            selected === "history" && " bg-[#0B0228]"
          )}
        >
          History
        </p>
      </div>

      <div>
        {selected === "deposit" && (
          <div className="flex flex-col gap-4">
            <div className="px-2 flex flex-row gap-2 text-[11px] text-[#98A2B3]">
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
        {selected === "history" && <div>History page</div>}
      </div>
    </div>
  );
};

export default LinkageWallet;
