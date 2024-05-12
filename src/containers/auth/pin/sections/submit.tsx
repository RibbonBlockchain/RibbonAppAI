"use client";

import { useAtomValue } from "jotai";
import { signIn } from "next-auth/react";
import Button from "@/components/button";
import { authAtom } from "@/lib/atoms/auth.atom";

const Submit = () => {
  const form = useAtomValue(authAtom);
  const isFormInvalid = !form.phoneNumber.trim() || !form.pin.trim();

  const handleSubmit = async () => {
    await signIn("credentials", {
      pin: form.pin,
      phone: form.phoneNumber,
    });
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        //loading={}
        onClick={handleSubmit}
        disabled={isFormInvalid}
      >
        Sign In
      </Button>
    </div>
  );
};

export default Submit;
