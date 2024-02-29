"use client";

import Link from "next/link";
import OtpInput from "react-otp-input";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import TextPrimary, { TextSecondary } from "@/components/text";

const Verify = () => {
  const phoneNumber = "+234 8143481577";
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6">
      <div className="h-full w-full flex flex-col  gap-4 sm:gap-6">
        <Link href="/" className="flex py-4 w-[40px]">
          <ArrowLeft />
        </Link>

        <div className="flex flex-col gap-2">
          <TextPrimary text="Verify your phone number" />
          <TextSecondary text={`A code has been sent to ${phoneNumber}`} />
        </div>

        <OtpInput
          value={otp}
          numInputs={6}
          onChange={setOtp}
          containerStyle={{
            display: "flex",
            paddingTop: "14px",
            alignItems: "center",
            paddingBottom: "14px",
            justifyContent: "start",
          }}
          inputStyle={{
            gap: "10px",
            width: "40px",
            height: "40px",
            outline: "none",
            fontSize: "16px",
            textAlign: "center",
            borderRadius: "5px",
            borderColor: "#007bff",
            border: "1px solid #3b3b3b",
          }}
          renderSeparator={<span className="mr-3"> </span>}
          renderInput={(props) => <input {...props} />}
        />

        <div className="flex flex-row gap-2">
          <TextSecondary text="I didn’t get a code!" />
          <span className="text-sm font-normal text-[#4285F4]">
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
