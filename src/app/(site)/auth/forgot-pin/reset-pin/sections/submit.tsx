"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { usePhoneSignUpRequest } from "@/api/auth";
import { authAtom } from "@/lib/atoms/auth.atom";
import phoneValidator from "validator/lib/isMobilePhone";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = usePhoneSignUpRequest();

  const isLoading = isPending || isSuccess;

  const isValidPhoneNumber =
    !!form.phoneNumber.trim() && phoneValidator(form.phoneNumber);

  const isFormInvalid = !isValidPhoneNumber;
  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = (data: any) => {
    if (data?.exists) {
      router.push("/auth/forgot-pin/verify");
    }
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request({ phone: form.phoneNumber } as any, { onSuccess });
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
