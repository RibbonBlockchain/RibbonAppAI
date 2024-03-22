"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import BgEffect from "@/components/questionnarie/bg-effect";

export default function Claim() {
  return (
    <div className="p-5 relative min-h-screen">
      <BgEffect />
      <div className="flex justify-end text-primary text-[0.75rem] font-extrabold items-center ">
        <div className="bg-[#F2EEFF] flex items-center p-2.5 rounded-[32px] gap-1">
          <Image
            src="/images/questionnaire/giftbox.svg"
            alt="giftbox"
            width={19}
            height={21}
            className=""
          />
          Win 4 WLD
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative">
          <Image
            src="/images/questionnaire/giftbox.svg"
            alt="giftbox"
            width={69}
            height={65}
            className=""
          />

          <Image
            src="/images/questionnaire/gift.svg"
            alt="giftbox"
            width={69}
            height={65}
            className="absolute -top-4 ml-20"
          />
        </div>

        <div className="text-primary font-text-2xl flex items-center font-bold gap-x-2 mt-10">
          <Image
            src="/images/questionnaire/cup.png"
            alt="cup"
            width={29}
            height={31}
          />

          <span>+ 15 points</span>

          <Image
            src="/images/questionnaire/coins.png"
            alt="cup"
            width={35}
            height={28}
          />

          <span>2 WLD</span>
        </div>

        <h3 className="text-2xl text-primary font-extrabold mt-10">
          Reward claimed
        </h3>
      </div>
      <div className="mt-10 bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-white text-center py-3.5 font-semibold rounded-lg fixed bottom-4 left-0 right-0 mx-5">
        <Link
          href={"/dashboard"}
          className="flex items-center justify-center gap-2"
        >
          Return home
          <Image
            src="/images/questionnaire/coins.png"
            alt="coins"
            width={22}
            height={18}
          />
        </Link>
      </div>
    </div>
  );
}
