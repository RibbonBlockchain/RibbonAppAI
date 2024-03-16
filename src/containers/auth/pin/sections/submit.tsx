"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { usePhoneLogin } from "@/api/auth";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: login } = usePhoneLogin();

  const isLoading = isPending || isSuccess;
  const isFormInvalid = !form.phoneNumber.trim() || !form.pin.trim();
  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = () => {
    router.push("/dashboard");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    login({ pin: form.pin, phone: form.phoneNumber }, { onSuccess });
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Sign In
      </Button>
    </div>
  );
};

export default Submit;
