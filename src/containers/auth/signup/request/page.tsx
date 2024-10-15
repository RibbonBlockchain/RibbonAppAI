import React from "react";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import BackArrow from "./sections/back";

const Signup = () => {
  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow stroke="#FFF" />

        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">Let&apos;s get started!</h1>
          <p className="text-sm">
            Enter your phone number. We will send you confirmation code here.
          </p>
        </div>

        <FormInput />
      </div>

      <Submit />
    </div>
  );
};

export default Signup;
