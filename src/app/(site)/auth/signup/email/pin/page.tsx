"use client";

import React from "react";
import { login } from "@/api/auth/req";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { usePhoneSignUpPin } from "@/api/auth";
import { authAtom } from "@/lib/atoms/auth.atom";
import OtpInput from "@/components/input/otp-input";
import BackArrow from "@/components/button/back-arrow";

const Login = () => {
  const [state, setState] = useAtom(authAtom);

  const setPin = (pin: string) => {
    setState((prev) => ({ ...prev, pin }));
  };

  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = usePhoneSignUpPin();

  const isLoading = isPending || isSuccess;
  const isFormInvalid = !form.email || !form.pin.trim() || !form.code;

  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = async () => {
    await login({ pin: form.pin, phone: form.email });
    router.push("/dashboard");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request(
      { pin: form.pin, phone: form.phoneNumber, code: form.code },
      { onSuccess }
    );
  };

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow stroke="#fff" />

        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">Create your pin</h1>
          <p className="text-sm">
            Finish setting up your account by creating a 4-digit pin. You will
            use this pin to login to your account{" "}
          </p>
        </div>

        <div className="mt-4">
          <div>
            <p className="text-sm font-semibold mb-3">Enter your 4 digit pin</p>
            <OtpInput
              value={state.pin}
              setValue={setPin}
              inputType="password"
              separatorClassName="mr-4"
              fieldClassName="!w-14 !h-14"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full pb-6">
        <Button
          loading={isLoading}
          // onClick={handleSubmit}
          onClick={() => router.push("/dashboard")}
          disabled={isSubmitDisabled}
        >
          Continue
        </Button>
      </div>{" "}
    </div>
  );
};

export default Login;
