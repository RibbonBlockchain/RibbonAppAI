"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useCreateNewPin } from "@/api/auth";
import { authAtom } from "@/lib/atoms/auth.atom";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = useCreateNewPin();

  const isLoading = isPending || isSuccess;
  const isFormInvalid =
    !form.phoneNumber.trim() || !form.pin.trim() || !form.code;

  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = () => {
    router.push("/dashboard");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request(
      { pin: form.pin, phone: form.phoneNumber, code: form.code },
      { onSuccess }
    );
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
