"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import OtpInput from "@/components/otp-input";

const Verify = () => {
  const [otp, setOtp] = React.useState("");
  const phoneNumber = "+234 8143481577";

  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <Link href="/auth/login" className="flex py-4 w-[40px]">
          <ArrowLeft className="text-slate-700" />
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 font-extrabold text-3xl">
            Verify your phone number
          </h1>
          <p className="text-sm text-slate-600">
            A code has been sent to {phoneNumber}
          </p>
        </div>

        <OtpInput value={otp} setValue={setOtp} />

        <p className="text-sm text-slate-600">
          I didn&apos;t get a code!{" "}
          <span className="text-sm font-normal text-[#4285F4]">
            Resend code
          </span>
        </p>
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Link
          href="/dashboard"
          className="w-full text-white bg-[#4285F4] border-[#4285F4] py-3.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Verify;
