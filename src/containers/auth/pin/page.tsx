import React from "react";
import Link from "next/link";
import Submit from "./sections/submit";
import PinFormInput from "./sections/form";
import BackArrow from "../login/sections/back";

const Login = () => {
  return (
    <div className="dark:bg-[#171717] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow />

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 dark:text-white font-extrabold text-3xl">
            Enter your pin!
          </h1>
          <p className="text-sm text-slate-600 dark:text-white">
            Enter your pin access your dashboard.
          </p>
        </div>

        <div className="mt-4">
          <PinFormInput />
        </div>

        <Link
          href="/auth/forgot-pin/reset-pin"
          className="text-sm self-end text-[#6200EE] underline mt-5 mr-10"
        >
          Forgot Pin?
        </Link>
      </div>

      <Submit />
    </div>
  );
};

export default Login;
