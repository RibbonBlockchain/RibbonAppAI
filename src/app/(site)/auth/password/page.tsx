import React from "react";
import Link from "next/link";
import BackArrow from "@/components/button/back-arrow";

const LoginPassword = () => {
  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow />

        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">Enter your pin!</h1>
          <p className="text-sm">Enter your pin access your dashboard.</p>
        </div>

        <div className="mt-4">{/* <PinFormInput /> */}</div>

        <Link
          href="/auth/forgot-pin/reset-pin"
          className="text-sm self-end text-[#6200EE] underline mt-5 mr-10"
        >
          Forgot Password?
        </Link>
      </div>

      {/* <Submit /> */}
    </div>
  );
};

export default LoginPassword;
