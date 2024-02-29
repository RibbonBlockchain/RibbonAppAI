import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/button";
import OtpInput from "@/components/otp-input";
import TextPrimary, { TextSecondary } from "@/components/text";

const Verify = () => {
  const phoneNumber = "+234 8143481577";

  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <Link href="/auth/login" className="flexpy-4 w-[40px] ">
          <ArrowLeft />
        </Link>
        <div className="flex flex-col gap-2">
          <TextPrimary text="Verify your phone number" />
          <TextSecondary text={`A code has been sent to ${phoneNumber}`} />
        </div>
        <OtpInput />
        <div className="flex flex-row gap-2">
          <TextSecondary text="I didn’t get a code!" />
          <span className="text-sm font-normal text-[#4285F4]">
            {" "}
            Resend code
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Link
          href={"/dashboard"}
          className="w-full text-white bg-[#4285F4] border-[#4285F4] py-3.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Verify;
