"use client";

import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import OtpInput from "@/components/input/otp-input";

export const ConfirmFormInput = () => {
  const [state, setState] = useAtom(authAtom);

  const setConfirmPin = (pin2: string) => {
    setState((prev) => ({ ...prev, pin2 }));
  };

  return (
    <div>
      <OtpInput
        value={state.pin2}
        inputType="password"
        setValue={setConfirmPin}
        separatorClassName="mr-4"
        fieldClassName="!w-14 !h-14"
      />
    </div>
  );
};

const FormInput = () => {
  const [state, setState] = useAtom(authAtom);

  const setPin = (pin: string) => {
    setState((prev) => ({ ...prev, pin }));
  };

  return (
    <div>
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
