"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useUpdatePhone } from "@/api/auth";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import phoneValidator from "validator/lib/isMobilePhone";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { mutate: check, isPending, isSuccess } = useUpdatePhone();

  const isLoading = isPending || isSuccess;

  const isValidPhoneNumber =
    !!form.phoneNumber.trim() && phoneValidator(form.phoneNumber);

  const isFormInvalid = !isValidPhoneNumber;
  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = () => router.push("/questionnaire/verify-phone/verify");

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
        className={`${
          isSubmitDisabled ? "" : "bg-gradient-to-r from-[#714EE7] to-[#A81DA6]"
        }`}
      >
        Send OTP
      </Button>
    </div>
  );
};

export default Submit;
