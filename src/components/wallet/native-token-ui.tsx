import { LucideCopy } from "lucide-react";
import React from "react";

type Props = {
  address: string;
  handleCopyAddress: () => void;
  nativeTokenBalance: string;
  balanceUSD: string;
};

const NativeTokenUI = (props: Props) => {
  return (
    <div className="text-center ">
      <div className="flex mt-6 flex-row gap-5 items-center justify-center ">
        <p className="text-[16px]">{props.address}</p>

        <p className="cursor-pointer" onClick={props.handleCopyAddress}>
          <LucideCopy fill="#939393" stroke="#939393" size={16} />
        </p>
      </div>

      <div className="flex flex-col items-center justify-center font-semibold ">
        <p className="text-[42px] w-fit">{props.nativeTokenBalance} ETH</p>
        <p className="text-[18px] text-[#626262]"> $ {props.balanceUSD} </p>
      </div>
    </div>
  );
};

export default NativeTokenUI;
