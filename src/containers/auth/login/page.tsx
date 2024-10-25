"use client";

import React, { useState } from "react";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import BackArrow from "./sections/back";
import InputBox from "@/components/questionnarie/input-box";
import SubmitEmailLogin from "./sections/submitEmailLogin";
import { authAtom } from "@/lib/atoms/auth.atom";
import { useAtom } from "jotai";

const Login = () => {
  const [state, setState] = useAtom(authAtom);

  const setEmail = (email: string) => setState((prev) => ({ ...prev, email }));
  const setPassword = (password: string) =>
    setState((prev) => ({ ...prev, password }));

  const [pageUI, setPageUI] = useState("personal");

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      {pageUI === "personal" && (
        <>
          <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
            <BackArrow />

            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-extrabold text-3xl">Welcome back!</h1>
              <p className="text-sm">Please Sign In with your phone number</p>
            </div>

            <FormInput />

            <p
              className="text-sm underline mt-5 text-end"
              onClick={() => setPageUI("organization")}
            >
              Sign in as organization instead?
            </p>
          </div>

          <Submit />
        </>
      )}

      {pageUI === "organization" && (
        <>
          <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
            <BackArrow />

            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-extrabold text-3xl">Welcome back!</h1>
              <p className="text-sm">
                Please sign in with your organization email
              </p>
            </div>

            {/* <FormInput /> */}
            <div>
              <InputBox
                name={"email"}
                value={state.email}
                label={"Email"}
                required={false}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputBox
                name={"password"}
                value={state.password}
                label={"Password"}
                required={false}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p
              className="text-sm underline mt-5 text-end"
              onClick={() => setPageUI("personal")}
            >
              Sign in with phone number instead?
            </p>
          </div>

          <SubmitEmailLogin />
        </>
      )}
    </div>
  );
};

export default Login;
