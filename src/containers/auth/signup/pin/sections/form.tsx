"use client";

import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import OtpInput from "@/components/input/otp-input";

const FormInput = () => {
  const [state, setState] = useAtom(authAtom);

  const setPin = (pin: string) => {
    setState((prev) => ({ ...prev, pin }));
  };

  return (
    <div>
      <p className="text-sm font-semibold mb-3">Enter your 4 digit pin</p>
      <OtpInput
        value={state.pin}
        setValue={setPin}
        inputType="password"
        separatorClassName="mr-4"
        fieldClassName="!w-14 !h-14"
      />
    </div>
  );
};

export default FormInput;
