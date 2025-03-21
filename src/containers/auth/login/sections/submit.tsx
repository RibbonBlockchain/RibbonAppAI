"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useCheckPhone } from "@/api/auth";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import phoneValidator from "validator/lib/isMobilePhone";
import toast from "react-hot-toast";
import RewardAnimation from "@/components/reward-animation";
import { useState } from "react";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { mutate: check, isPending, isSuccess } = useCheckPhone();

  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const isLoading = isPending || isSuccess;

  const isValidPhoneNumber =
    !!form.phoneNumber.trim() && phoneValidator(form.phoneNumber);

  const isFormInvalid = !isValidPhoneNumber;
  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = () => {
    setShowRewardAnimation(true);
    toast.success("You received 2000 Ribbon reward");

    setTimeout(() => {
      router.push("/auth/pin");
    }, 2000);
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    check({ phone: form.phoneNumber }, { onSuccess });
  };

  return (
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
  );
};

export default Submit;
