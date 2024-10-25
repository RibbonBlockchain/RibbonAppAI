import React from "react";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import BackArrow from "./sections/back";
import LinkButton from "@/components/button/link";
import { WorldIdButton } from "../../landing/button";
import { AppleIcon, GoogleIcon } from "@/public/assets";

const Signup = () => {
  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow stroke="#FFF" />

        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">Let&apos;s get started!</h1>
          <p className="text-sm">
            Enter your phone number. We will send you confirmation code here.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <FormInput />
          <Submit />
        </div>
      </div>

      <div className="w-full flex flex-row gap-4 items-center justify-center">
        <hr className="w-full h-[1px] text-white " />
        or
        <hr className="w-full h-[1px] text-white " />
      </div>

      <div className="w-full flex flex-col gap-3">
        <LinkButton
          href="#"
          className="flex bg-inherit border border-[#E5E7EB] flex-row items-center justify-center gap-3"
        >
          <AppleIcon /> Continue with Apple
        </LinkButton>

        <LinkButton
          href="#"
          className="flex bg-inherit border border-[#E5E7EB] flex-row items-center justify-center gap-3"
        >
          <GoogleIcon /> Continue with Google
        </LinkButton>

        <WorldIdButton>Sign In with World ID</WorldIdButton>
      </div>
    </div>
  );
};

export default Signup;
