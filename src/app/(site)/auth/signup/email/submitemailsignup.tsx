"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import { useCheckMail } from "@/api/auth";
import { TCheckPhoneResponse } from "@/api/auth/types";
import toast from "react-hot-toast";
import RewardAnimation from "@/components/reward-animation";
import { useState } from "react";

const SubmitEmailSignup = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = useCheckMail();

  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const isLoading = isPending || isSuccess;

  const isValidEmail =
    !!form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const isFormInvalid = !isValidEmail;
  const isSubmitDisabled = isLoading;

  const onSuccess = (data: TCheckPhoneResponse) => {
    const url = data?.exists ? "/auth/password" : "/auth/signup/email/verify";
    setShowRewardAnimation(true);
    toast.success("You received 2500 Ribbon reward");

    setTimeout(() => {
      router.push(url);
    }, 2000);
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request({ email: form.email }, { onSuccess });
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        {/* Send Email verification Code */}
        Continue
      </Button>

      {showRewardAnimation && <RewardAnimation />}
    </div>
  );
};

export default SubmitEmailSignup;
