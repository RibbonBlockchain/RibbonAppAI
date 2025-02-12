"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { signIn } from "next-auth/react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import RewardAnimation from "@/components/reward-animation";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const isFormInvalid = !form.phoneNumber.trim() || !form.pin.trim();

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      pin: form.pin,
      phone: form.phoneNumber,
    });

    setIsLoading(false);
    setShowRewardAnimation(true);
    toast.success("You received 1000 Ribbon reward");

    if (res?.error) {
      setIsLoading(false);
      router.push("/");
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        disabled={isFormInvalid}
      >
        Sign in
      </Button>

      {showRewardAnimation && <RewardAnimation />}
    </div>
  );
};

export default Submit;
