"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useOnboardOTPVerify } from "@/api/auth";
import { mobileOnboardAtom } from "@/app/lib/atoms";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(mobileOnboardAtom);
  const { mutate: verify, isPending, isSuccess } = useOnboardOTPVerify();

  const isLoading = isPending || isSuccess;
  const isFormValid = form.code.length && form.phoneNumber.length;

  const onSuccess = () => {
    router.push("/dashboard");
  };

  const handleSubmit = () => {
    if (!isFormValid || isLoading) return;
    verify({ code: form.code, phone: form.phoneNumber }, { onSuccess });
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button loading={isLoading} onClick={handleSubmit}>
        Continue
      </Button>
    </div>
  );
};

export default Submit;
