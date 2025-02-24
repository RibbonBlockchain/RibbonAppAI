import React from "react";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import ReactOtpInput, { OTPInputProps } from "react-otp-input";

type Props = Pick<OTPInputProps, "numInputs" | "inputType"> & {
  value: string;
  fieldClassName?: ClassValue;
  setValue: (v: string) => void;
  separatorClassName?: ClassValue;
};

const OtpInput = ({
  value,
  setValue,
  fieldClassName,
  separatorClassName,
  inputType = "password",
  ...props
}: Props) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const data = e.clipboardData.getData("text");
    if (!data) return;
    setValue(data);
  };

  return (
    <ReactOtpInput
      value={value}
      onChange={setValue}
      inputType={inputType}
      onPaste={handlePaste}
      containerStyle={{ display: "flex", alignItems: "center" }}
      renderSeparator={() => (
        <span className={cn("mr-1 min-[336px]:mr-2", separatorClassName)} />
      )}
      renderInput={(p) => (
        <input
          {...p}
          className={cn(
            "outline-none bg-transparent border-[1px] !w-11 !h-11 rounded-xl:bg-transparent rounded-xl focus:outline-none focus:border-stone-600 focus:ring-stone-600 focus:ring-1",
            fieldClassName
          )}
          type="password"
          inputMode="numeric"
        />
      )}
      {...props}
    />
  );
};

export default OtpInput;
