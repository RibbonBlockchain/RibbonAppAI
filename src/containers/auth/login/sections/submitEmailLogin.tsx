"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useCheckPhone, useEmailLogin } from "@/api/auth";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import phoneValidator from "validator/lib/isMobilePhone";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const SubmitEmailLogin = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { mutate: emailLogin, isPending, isSuccess } = useEmailLogin();

  const isLoading = isPending || isSuccess;

  //   const isValidPhoneNumber =
  //     !!form.phoneNumber.trim() && phoneValidator(form.phoneNumber);

  //   const isFormInvalid = !isValidPhoneNumber;
  const isSubmitDisabled = isLoading;

  const onSuccess = () => router.push("/dashboard");

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;
    emailLogin({ email: form.email, password: form.password }, { onSuccess });
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

export default SubmitEmailLogin;
