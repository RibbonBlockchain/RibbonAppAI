"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useEmailLogin, useLoginPassword } from "@/api/auth";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import toast from "react-hot-toast";
import { useState } from "react";
import RewardAnimation from "@/components/reward-animation";

const SubmitEmailLogin = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { mutate: emailLogin, isPending, isSuccess } = useEmailLogin();
  const { mutate: loginPassword } = useLoginPassword();

  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const isLoading = isPending || isSuccess;

  //   const isValidPhoneNumber =
  //     !!form.phoneNumber.trim() && phoneValidator(form.phoneNumber);

  //   const isFormInvalid = !isValidPhoneNumber;
  const isSubmitDisabled = isLoading;

  const onSuccess = () => {
    setShowRewardAnimation(true);
    toast.success("You received 1000 Ribbon reward");

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;
    loginPassword({ email: form.email, password: form.password });
    emailLogin({ email: form.email, password: form.password }, { onSuccess });
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Sign In
      </Button>

      {showRewardAnimation && <RewardAnimation />}
    </div>
  );
};

export default SubmitEmailLogin;
