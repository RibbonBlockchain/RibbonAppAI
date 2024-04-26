"use client";

import React from "react";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useUpdateProfile } from "@/api/user";
import { authAtom } from "@/lib/atoms/auth.atom";
import { useGetAuth, useVerifyPhoneUpdate } from "@/api/auth";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { data: user } = useGetAuth();
  const { mutate: verify, isPending, isSuccess } = useVerifyPhoneUpdate();

  const { mutate: updateUserProfile } = useUpdateProfile();

  const isLoading = isPending || isSuccess;
  const isFormInvalid = form.code.length < 6 || !form.phoneNumber;
  const isSubmitDisabled = isFormInvalid || isLoading;

  const onSuccess = () => {
    if (!user?.phone) {
      updateUserProfile({ phone: form.phoneNumber });
    }
    toast("Phone number verification successful");
    router.push("/dashboard/questionnaire/verify-phone/confirmation");
    console.log(form.phoneNumber, "<<<phone number updated>>>>");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    verify({ code: form.code, phone: form.phoneNumber }, { onSuccess });
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
