"use client";

import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import { useVerifyPhoneUpdate } from "@/api/auth";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { mutate: verify, isPending, isSuccess } = useVerifyPhoneUpdate();

  const isLoading = isPending || isSuccess;
  const isFormInvalid = form.code.length < 6 || !form.phoneNumber;
  const isSubmitDisabled = isFormInvalid || isLoading;

  const onSuccess = () => {
    toast("Phone number verification successful");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    verify({ code: form.code, phone: form.phoneNumber }, { onSuccess });
    router.push("/dashboard/questionnaire/verify-phone/confirmation");
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Confirm
      </Button>
    </div>
  );
};

export default Submit;
