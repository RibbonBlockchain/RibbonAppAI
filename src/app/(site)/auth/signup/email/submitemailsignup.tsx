"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import { useCheckMail, usePhoneSignUpRequest } from "@/api/auth";
import { TCheckPhoneResponse } from "@/api/auth/types";

const SubmitEmailSignup = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = useCheckMail();

  const isLoading = isPending || isSuccess;

  const isValidEmail =
    !!form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const isFormInvalid = !isValidEmail;
  const isSubmitDisabled = isLoading;

  const onSuccess = (data: TCheckPhoneResponse) => {
    const url = data?.exists ? "/auth/password" : "/auth/signup/email/verify";
    router.push(url);
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
    </div>
  );
};

export default SubmitEmailSignup;
