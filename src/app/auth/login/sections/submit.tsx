"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { usePhoneAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import { phoneAuthAtom } from "@/lib/atoms/auth.atom";
import { TPhoneAuthResponse } from "@/api/auth/types";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(phoneAuthAtom);
  const { isPending, isSuccess, mutate: request } = usePhoneAuth();

  const isLoading = isPending || isSuccess;
  const isFormInvalid = !form.phoneNumber.trim();
  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = (data: TPhoneAuthResponse) => {
    const url = data?.exists ? "/auth/pin" : "/auth/verify";
    router.push(url);
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request({ phone: form.phoneNumber }, { onSuccess });
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
