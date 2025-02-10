"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import OtpInput from "@/components/input/otp-input";
import BackArrow from "@/components/button/back-arrow";
import { SpinnerIcon } from "@/components/icons/spinner";
import {
  usePhoneLogin,
  useVerifyEmailSignUp,
  useVerifyPhoneForgotPassword,
} from "@/api/auth";
import toast from "react-hot-toast";
import RewardAnimation from "@/components/reward-animation";

const Verify = () => {
  const { email } = useAtomValue(authAtom);

  const [state, setState] = useAtom(authAtom);
  // const { mutate: request, isPending: isRequesting } = usePhoneLogin();

  const setOtp = (code: string) => setState((prev) => ({ ...prev, code }));

  // const handleRequest = () => {
  //   if (isRequesting) return;
  //   request({ phone: state.phoneNumber } as any);
  // };

  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: verify } = useVerifyEmailSignUp();

  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const isLoading = isPending || isSuccess;
  const isFormInvalid = form.code.length < 6 || !form.email;
  const isSubmitDisabled = isFormInvalid || isLoading;

  const onSuccess = () => {
    setShowRewardAnimation(true);
    toast.success("You received 2500 Ribbon reward");

    setTimeout(() => {
      router.push("/auth/signup/email/password");
    }, 2000);
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    verify({ code: form.code, email: form.email } as any, { onSuccess });
  };

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow stroke="#FFF" />
        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">
            Verify your organization email
          </h1>
          {/* <p className="text-sm ">A code has been sent to {email}.</p>{" "} */}
          <p className="text-sm ">
            We have prefilled a default code for test purpose.
          </p>{" "}
        </div>

        <p className="text-sm font-extrabold mt-3 -mb-2">Enter Code</p>
        <>
          <OtpInput
            inputType="password"
            numInputs={6}
            value={state.code}
            setValue={setOtp}
          />
          <p className="flex items-center gap-2 text-sm mt-4">
            <span>I didn&apos;t get a code!</span>{" "}
            <span
              // onClick={handleRequest}
              onClick={() => {}}
              className="cursor-pointer text-sm inline-flex font-normal text-[#4285F4]"
            >
              {/* {isRequesting ? (
                <SpinnerIcon className="text-blue-500" />
              ) : (
                "Resend Code"
              )} */}
              Resend Code
            </span>
          </p>
        </>
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Button
          loading={isLoading}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Continue
        </Button>

        {showRewardAnimation && <RewardAnimation />}
      </div>
    </div>
  );
};

export default Verify;
