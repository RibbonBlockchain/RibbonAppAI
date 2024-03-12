"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { usePhoneAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import { TPhoneAuthResponse } from "@/api/auth/types";
import phoneValidator from "validator/lib/isMobilePhone";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = usePhoneAuth();

  const isLoading = isPending || isSuccess;

  const isValidPhoneNumber =
    !!form.phoneNumber.trim() && phoneValidator(form.phoneNumber);

  const isFormInvalid = !isValidPhoneNumber;
  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = (data: TPhoneAuthResponse) => {
    if (data?.exists) {
      router.push("/auth/reset-pin");
    }
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
