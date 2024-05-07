"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useCheckPhone } from "@/api/auth";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import phoneValidator from "validator/lib/isMobilePhone";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { mutate: check, isPending, isSuccess } = useCheckPhone();

  const isLoading = isPending || isSuccess;

  const isValidPhoneNumber =
    !!form.phoneNumber.trim() && phoneValidator(form.phoneNumber);

  const isFormInvalid = !isValidPhoneNumber;
  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = () => router.push("/auth/pin");

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    check({ phone: form.phoneNumber }, { onSuccess });
  };

  // const number = "+542936405564";
  // // const number = "+2348102523205";

  // const isValid = phoneValidator(number, "any");

  // console.log(isValid, "TF");

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
