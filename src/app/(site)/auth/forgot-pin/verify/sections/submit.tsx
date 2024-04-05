"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import { useVerifyPhoneForgotPassword } from "@/api/auth";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const {
    isPending,
    isSuccess,
    mutate: verify,
  } = useVerifyPhoneForgotPassword();

  const isLoading = isPending || isSuccess;
  const isFormInvalid = form.code.length < 6 || !form.phoneNumber;
  const isSubmitDisabled = isFormInvalid || isLoading;

  const onSuccess = () => {
    router.push("/auth/forgot-pin/create-new-pin");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    verify({ code: form.code, phone: form.phoneNumber } as any, { onSuccess });
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
    </div>
  );
};

export default Submit;
