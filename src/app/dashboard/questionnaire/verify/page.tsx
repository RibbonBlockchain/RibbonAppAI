"use client";

import React from "react";
import Submit from "@/containers/auth/login/sections/submit";
import FormInput from "@/containers/auth/signup/verify/sections/form";
import Link from "next/link";
import {
  SubHeading,
  BackArrow,
} from "@/containers/auth/signup/verify/sections/components";

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

      {/* <div
        className="fleVerify your phone number
x items-center justify-center w-full pb-6"
      >
        <Submit />
      </div> */}

      {/*  */}
      <div className="mt-10 bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-white text-center py-3.5 font-semibold rounded-lg fixed bottom-4 left-0 right-0 mx-4">
        <Link href="/dashboard/questionnaire/verify" className="">
          Confirm
        </Link>
      </div>
    </div>
  );
};

export default Verify;
