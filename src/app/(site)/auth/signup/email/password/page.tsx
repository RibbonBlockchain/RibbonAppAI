"use client";

import React from "react";
import { login } from "@/api/auth/req";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { usePasswordSignUp } from "@/api/auth";
import { authAtom } from "@/lib/atoms/auth.atom";
import BackArrow from "@/components/button/back-arrow";
import InputBox from "@/components/questionnarie/input-box";

const Login = () => {
  const [state, setState] = useAtom(authAtom);

  const setPassword = (password: string) => {
    setState((prev) => ({ ...prev, password }));
  };

  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = usePasswordSignUp();

  const isLoading = isPending || isSuccess;
  const isFormInvalid = !form.email || !form.password;

  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = async () => {
    await login({ pin: form.password, phone: form.email });
    router.push("/dashboard");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request({ password: form.password, email: form.email }, { onSuccess });
  };

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow stroke="#fff" />

        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">Create your pin</h1>
          <p className="text-sm">
            Finish setting up your account by creating a password. You will use
            this password to login to your account{" "}
          </p>
        </div>

        <div className="mt-4">
          <div>
            <p className="text-sm font-semibold mb-3">Create your password</p>

            <InputBox
              name={"password"}
              value={state.password}
              label={"Password"}
              required={false}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full pb-6">
        <Button
          loading={isLoading}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Continue
        </Button>
      </div>{" "}
    </div>
  );
};

export default Login;
