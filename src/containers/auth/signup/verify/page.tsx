"use client";

import React from "react";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import { BackArrow, SubHeading } from "./sections/components";

const Verify = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow />

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 font-extrabold text-3xl">
            Verify your phone number
          </h1>

          <SubHeading />
        </div>

        <FormInput />
      </div>

      <div
        className="fleVerify your phone number
x items-center justify-center w-full pb-6"
      >
        <Submit />
      </div>
    </div>
  );
};

export default Verify;
