"use client";

import React, { useState } from "react";

import BackArrowButton from "@/components/button/back-arrow";
import Button from "@/components/button";
import { WorldID } from "@/public/images";
import { useRouter } from "next/navigation";

const Amount = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<any>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setInputValue(isNaN(newValue) ? 0 : newValue);
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <div className="">
          <BackArrowButton stroke="#583DB4" />
          <div className="flex -mt-10 flex-row items-center justify-center text-lg font-medium">
            Enter amount
          </div>
        </div>

        <div className="flex flex-row gap-3 items-center px-2">
          <WorldID />
          <div>
            <p className="text-sm font-semibold">5 WLD</p>
            <p className="text-xs text-[#8C8C8C]">USD $ 122.5 available</p>
          </div>
        </div>

        <div className="px-2 flex flex-col gap-6">
          <div className="flex flex-row gap-3 items-center justify-between">
            <p className="text-[30px] font-bold">{inputValue * 8.93}</p>
            <p className="text-[22px] font-bold">WLD</p>
          </div>

          <div className="flex flex-row gap-3 text-[#939393] items-center justify-between">
            <input
              type={"text"}
              name={"amount"}
              value={inputValue}
              onChange={handleChange}
              className="text-[30px] font-bold max-w-[80%]"
            />
            <p className="text-[22px] font-bold">USD</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Button
          loading={false}
          onClick={() => router.push("/withdraw/preview")}
          disabled={false}
        >
          Preview
        </Button>
      </div>
    </div>
  );
};

export default Amount;
