"use client";

import React from "react";
import Link from "next/link";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import { ArrowLeft } from "lucide-react";
import { SubHeading } from "./sections/components";

const Verify = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <Link href="/auth/login" className="flex py-4 w-[40px]">
          <ArrowLeft className="text-slate-700" />
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 font-extrabold text-3xl">
            Verification required
          </h1>

          <SubHeading />
        </div>

        <p className="text-sm text-slate-600 font-extrabold mt-3 -mb-2">
          Enter OTP
        </p>
        <FormInput />
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Submit />
      </div>
    </div>
  );
};

export default Verify;
