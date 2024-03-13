import React from "react";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import BackArrow from "./sections/back";

const ResetPin = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow />

        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-slate-700 font-extrabold text-3xl">
            Reset your Pin
          </h1>
          <p className="text-sm text-slate-600 text-center">
            Enter the phone number associated with your Ribbon Protocol account{" "}
          </p>
        </div>

        <FormInput />
      </div>

      <Submit />
    </div>
  );
};

export default ResetPin;
