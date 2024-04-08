"use client";

import React from "react";
import Image from "next/image";
import { LoveSmileyEmoji } from "@/public/images";
import BgEffect from "@/components/questionnarie/bg-effect";

const Claim = ({ onclick }: { onclick: () => void }) => {
  return (
    <div className="p-4 sm:p-6 min-h-screen flex flex-col justify-between">
      <BgEffect />

      <div className="flex mt-5 justify-end text-primary text-[0.75rem] font-extrabold items-center ">
        <div className="bg-[#F2EEFF] flex items-center p-2.5 rounded-[32px] gap-1">
          <Image
            width={19}
            height={21}
            className=""
            alt="giftbox"
            src="/images/questionnaire/giftbox.svg"
          />
          Win 4 WLD
        </div>
      </div>

      <div className="flex flex-col items-center justify-center ">
        <div className="">
          <Image
            width={196}
            height={250}
            className=""
            alt="giftbox"
            src="/images/gift-box.png"
          />
        </div>

        <h3 className="text-2xl flex flex-row gap-2 text-primary font-extrabold mt-10">
          Reward claimed
          <LoveSmileyEmoji />
        </h3>

        <div className="text-primary w-full font-text-2xl flex items-center justify-between font-bold gap-x-6 mt-5 ">
          <div className="flex flex-row items-center justify-center gap-1 w-full py-2 rounded-full bg-[#F2eeff]">
            <Image
              alt="cup"
              width={35}
              height={28}
              src="/images/questionnaire/coins.png"
            />
            <span>5 WLD</span>
          </div>

          <div className="flex flex-row items-center justify-center gap-1 w-full py-2 rounded-full bg-[#F2eeff]">
            <Image
              alt="cup"
              width={29}
              height={31}
              src="/images/questionnaire/cup.png"
            />
            <span>+ 25,000 points</span>
          </div>
        </div>
      </div>

      <div className="mb-10 z-10 bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-white text-center py-3.5 font-semibold rounded-lg ">
        <button
          onClick={onclick}
          className="flex items-center justify-center gap-2"
        >
          Return home
          <Image
            src="/images/questionnaire/coins.png"
            alt="coins"
            width={22}
            height={18}
          />
        </button>
      </div>
    </div>
  );
};

export default Claim;
