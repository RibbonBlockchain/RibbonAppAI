"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import { usePhoneSignUpRequest } from "@/api/auth";
import { TCheckPhoneResponse } from "@/api/auth/types";
import phoneValidator from "validator/lib/isMobilePhone";
import toast from "react-hot-toast";
import RewardAnimation from "@/components/reward-animation";
import { useState } from "react";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = usePhoneSignUpRequest();

  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const isLoading = isPending || isSuccess;

  const isValidPhoneNumber =
    !!form.phoneNumber.trim() && phoneValidator(form.phoneNumber);

  const isFormInvalid = !isValidPhoneNumber;
  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = (data: TCheckPhoneResponse) => {
    setShowRewardAnimation(true);
    toast.success("You received 2500 Ribbon reward");

    setTimeout(() => {
      const url = data?.exists ? "/auth/pin" : "/auth/signup/phone/verify";
      router.push(url);
    }, 2000);
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request({ phone: form.phoneNumber }, { onSuccess });
  };

  console.log(showRewardAnimation, "here?");

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        {/* Send SMS Code */}
        Next
      </Button>

      {showRewardAnimation && <RewardAnimation />}
    </div>
  );
};

export default Submit;
