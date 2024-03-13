import React from "react";
import Link from "next/link";
import Submit from "./sections/submit";
import { ArrowLeft } from "lucide-react";
import PinFormInput from "./sections/form";

const Login = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <Link href="/" className="flex py-4 w-[40px]">
          <ArrowLeft className="text-slate-700" />
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 font-extrabold text-3xl">
            Enter your pin!
          </h1>
          <p className="text-sm text-slate-600">
            Welcome back. Enter your pin access your dashboard.
          </p>
        </div>

        <div className="mt-4">
          <PinFormInput />
        </div>

        <Link
          href="/auth/forgot-pin/reset-pin"
          className="text-sm text-end text-[#6200EE] underline mt-5"
        >
          Forgot Pin?
        </Link>
      </div>

      <Submit />
    </div>
  );
};

export default Login;
