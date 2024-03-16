import React from "react";
import Link from "next/link";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <Link href="/" className="flex py-4 w-[40px]">
          <ArrowLeft className="text-slate-700" />
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 font-extrabold text-3xl">
            Create your new Pin
          </h1>
          <p className="text-sm text-slate-600">
            Create your new 4-digit pin. We will ask you for this pin whenever
            you want to login!
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm text-slate-600 font-semibold mb-3">
            Enter your 4 digit pin
          </p>
          <FormInput />
        </div>

        <div className="mt-4">
          <p className="text-sm text-slate-600 font-semibold mb-3">
            Re-enter your 4 digit pin
          </p>
          <FormInput />
        </div>
      </div>

      <Submit />
    </div>
  );
};

export default Login;
