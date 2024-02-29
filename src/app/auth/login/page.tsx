"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhoneInput from "@/components/phone-input";
import CountrySelect from "@/components/country-select";

const Login = () => {
  const [phone, setPhone] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");

  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <Link href="/" className="flex py-4 w-[40px]">
          <ArrowLeft className="text-slate-700" />
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-700 font-extrabold text-3xl">
            Let&apos;s get started!
          </h1>
          <p className="text-sm text-slate-600">
            Enter your phone number. We will send you confirmation code here.
          </p>
        </div>

        <CountrySelect value={countryCode} setValue={setCountryCode} />

        <PhoneInput
          value={phone}
          setValue={setPhone}
          country={countryCode?.toLowerCase()}
        />
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Link
          href="/auth/verify"
          className="w-full text-sm font-semibold text-center p-4 rounded-xl border-solid border-blue-500 border-2 transition-colors duration-100 focus-visible:duration-0 bg-blue-500 text-white hover:bg-blue-600 focus-visible:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Login;
