"use client";

import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import OtpInput from "@/components/input/otp-input";

const PinFormInput = () => {
  const [state, setState] = useAtom(authAtom);

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

export default PinFormInput;
