import React from "react";
import Submit from "@/containers/auth/login/sections/submit";
import FormInput from "@/containers/auth/login/sections/form";
import BackArrow from "@/containers/auth/login/sections/back";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow />

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 font-extrabold text-3xl">
            Let&apos;s get started!
          </h1>
          <p className="text-sm text-slate-600">
            Enter your phone number. We will send you confirmation code here.
          </p>
        </div>

        <FormInput />
      </div>

      {/* <Submit /> */}
      <div className="mt-10 bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-white text-center py-3.5 font-semibold rounded-lg fixed bottom-4 left-0 right-0 mx-4">
        <Link href="/dashboard/questionnaire/verify" className="">
          Send OTP
        </Link>
      </div>
    </div>
  );
};

export default Signup;
