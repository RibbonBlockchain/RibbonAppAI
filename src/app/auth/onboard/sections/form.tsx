"use client";

import { useAtom } from "jotai";
import OtpInput from "@/components/otp-input";
import { phoneAuthAtom } from "@/lib/atoms/auth.atom";

const FormInput = () => {
  const [state, setState] = useAtom(phoneAuthAtom);

  const setPin = (pin: string) => {
    setState((prev) => ({ ...prev, pin }));
  };

  return (
    <OtpInput
      value={state.pin}
      setValue={setPin}
      inputType="password"
      separatorClassName="mr-4"
      fieldClassName="!w-14 !h-14"
    />
  );
};

export default FormInput;
