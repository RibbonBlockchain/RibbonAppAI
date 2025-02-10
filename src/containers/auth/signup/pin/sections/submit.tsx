"use client";

import { useAtomValue } from "jotai";
import { login } from "@/api/auth/req";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { usePhoneSignUpPin } from "@/api/auth";
import { authAtom } from "@/lib/atoms/auth.atom";
import toast from "react-hot-toast";
import { useState } from "react";
import RewardAnimation from "@/components/reward-animation";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = usePhoneSignUpPin();

  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const isLoading = isPending || isSuccess;
  const isFormInvalid =
    !form.phoneNumber.trim() || !form.pin.trim() || !form.code;

  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = async () => {
    await login({ pin: form.pin, phone: form.phoneNumber });
    setShowRewardAnimation(true);
    toast.success("You received 2500 Ribbon reward");

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request(
      { pin: form.pin, phone: form.phoneNumber, code: form.code },
      { onSuccess }
    );
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
