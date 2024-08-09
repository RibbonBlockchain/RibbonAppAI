import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import ProgressBar from "@ramonak/react-progress-bar";
import { ArrowSwapHorizontal, Wallet2 } from "iconsax-react";
import { LucideCopy, ArrowUp, ArrowDown, ArrowDownUp } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export const PointBalanceCard = ({
  points,
  onclick,
}: {
  points: number;
  onclick: () => void;
}) => (
  <div className="bg-[#3f3856] flex flex-col justify-between text-white rounded-2xl w-full min-w-[270px] xxs:min-w-[330px] xs:w-[400px] max-w-auto h-[210px] p-4 my-2 mt-2 border border-[#D6CBFF4D]">
    <div className="flex flex-row items-start justify-between">
      <div>
        <p className="text-sm font-medium mb-2">Points balance</p>
        <div>
          <div className="-ml-2 flex flex-row items-center gap-1 text-[20px] xxs:text-[24px] font-bold">
            <Image src={"/assets/coin.png"} alt="coin" height={32} width={32} />
            <p>{points * 5000} pts</p>
          </div>

          <div className="flex flex-row items-center gap-1 text-[12px] font-bold">
            <ArrowSwapHorizontal size="16" color="#ffffff" />
            <p>{points} wld</p>
          </div>
        </div>
      </div>
      <div className="p-3" onClick={onclick}>
        <Wallet2 size="28" color="#ffffff" variant="Bold" />
      </div>
    </div>

    <div className="flex flex-col gap-3 mt-4">
      <p className="flex self-end text-xs font-medium">{points}/50,000 pts</p>

      <div style={{ position: "relative", width: "100%" }}>
        <ProgressBar
          height="42px"
          completed={(points * 100) / 50000}
          bgColor="#A166F5"
          labelColor="#A166F5"
          customLabel={"."}
          baseBgColor="#D6CBFF33"
        />

        <div className="flex justify-center">
          <p className="absolute top-2 px-6 text-[#F6F1FE] font-semibold">
            Claim points
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const WalletBalanceCard = () => (
  <div className="bg-[#3f3856] text-white rounded-2xl w-full min-w-[270px] xxs:min-w-[330px] xs:w-[400px] max-w-auto h-[210px] p-4 my-2 flex flex-col mt-2 border border-[#D6CBFF4D]">
    <div>
      <p className="text-sm font-medium mb-2">Your wallet</p>
      <div>
        <div className="text-[24px] font-bold">
          <p>$ 0</p>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p className="text-xs">
            {shorten("0xcFD1fhskdjfhsdkfhsdfhjkshdfjkhsdfhsdkjc79Ec")}
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              copyToClipboard(
                shorten("0xcFD1fhskdjfhsdkfhsdfhjkshdfjkhsdfhsdkjc79Ec")
              ),
                toast.success(`copied`);
            }}
          >
            <LucideCopy fill="#fff" stroke="#fff" size={16} />
          </p>
        </div>
      </div>{" "}
    </div>

    <div className="w-full pt-5 flex gap-4 items-center justify-between text-xs font-bold">
      <div className="cursor-pointer w-full items-center justify-center flex flex-col gap-2">
        <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
          <ArrowUp stroke="#7C56FE" />
        </div>
        Send
      </div>

      <div className="cursor-pointer w-full items-center justify-center flex flex-col gap-2">
        <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
          <ArrowDown stroke="#7C56FE" />
        </div>
        Recieve
      </div>

      <div className="cursor-pointer w-full items-center justify-center flex flex-col gap-2">
        <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
          <ArrowDownUp stroke="#7C56FE" />
        </div>
        Swap
      </div>
    </div>
  </div>
);
