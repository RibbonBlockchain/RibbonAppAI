import React from "react";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import BackArrow from "./sections/back";

const Login = () => {
  return (
    <div className="dark:bg-[#171717] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow />

        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-slate-700 dark:text-white font-extrabold text-3xl">
            Welcome back!
          </h1>
          <p className="text-sm text-slate-600 dark:text-white">
            Please Sign In with your phone number
          </p>
        </div>

        <FormInput />
      </div>

      <Submit />
    </div>
  );
};

export default Login;
