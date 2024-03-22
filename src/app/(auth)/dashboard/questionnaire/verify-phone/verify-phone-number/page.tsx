import React from "react";
import Submit from "./submit";
import FormInput from "@/containers/auth/login/sections/form";
import BackArrow from "@/containers/auth/login/sections/back";

const VerifyPhone = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-5 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow />

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 font-extrabold text-2xl">
            Enter your phone number.
          </h1>
          <p className="text-sm text-slate-600">
            We will send you confirmation code here.
          </p>
        </div>

        <FormInput />
      </div>

      <Submit />
    </div>
  );
};

export default VerifyPhone;
