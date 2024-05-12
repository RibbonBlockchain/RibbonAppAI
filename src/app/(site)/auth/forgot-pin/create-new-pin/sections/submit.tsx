"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useCreateNewPin } from "@/api/auth";
import { authAtom } from "@/lib/atoms/auth.atom";
import toast from "react-hot-toast";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { isPending, isSuccess, mutate: request } = useCreateNewPin();

  const isLoading = isPending || isSuccess;
  const isFormInvalid =
    !form.phoneNumber.trim() || !form.pin.trim() || !form.code;

  const confirmNePins = form.pin.trim() === form.pin2.trim();

  const isSubmitDisabled = isLoading || isFormInvalid || !confirmNePins;

  if (form.pin2.length === 4 && !confirmNePins) {
    toast.error("Pin mismatch: Please re-enter your PIN to confirm");
  }

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
