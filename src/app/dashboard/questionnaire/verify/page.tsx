"use client";

import React from "react";
import FormInput from "@/containers/auth/signup/verify/sections/form";
import {
  BackArrow,
  SubHeading,
} from "@/containers/auth/signup/verify/sections/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Submit from "./submit";

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfimation = () => {
    setIsLoading(true);
  };

  if (isLoading) {
    router.push("/dashboard/questionnaire/confirmation");
  }

  // setTimeout(() => {
  //   // Navigate to the confirmation page after 3 seconds
  //   router.push("/dashboard/questionnaire/confirmation");
  // }, 3000);

  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-5 sm:p-6">
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

      {/*  */}
      {/* <div className="bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-white text-center py-3.5 font-semibold rounded-lg fixed bottom-4 left-0 right-0 mx-5">
        <button onClick={handleConfimation}>Confirm</button>
      </div> */}
    </div>
  );
};

export default Verify;
