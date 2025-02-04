"use client";

import React from "react";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import { BackArrow, SubHeading } from "./sections/components";

const Verify = () => {
  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow stroke="#FFF" />

        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">Verify your phone number</h1>

          {/* <SubHeading /> */}
          <p className="text-sm">Test verification code is: 000000.</p>
          <p className="text-sm">Click verify to continue.</p>
        </div>

        <FormInput />
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Submit />
      </div>
    </div>
  );
};

export default Verify;
