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

const Separator = ({ className }: any) => (
  <span className={cn("mr-1 min-[336px]:mr-2", className)}> </span>
);

const FieldInput = ({ className, ...props }: any) => (
  <input
    {...props}
    className={cn(
      "outline-none bg-transparent border-[1px] !w-11 !h-11 rounded-xl:bg-transparent rounded-xl",
      className
    )}
  />
);

const OtpInput = ({
  value,
  setValue,
  fieldClassName,
  separatorClassName,
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
      onPaste={handlePaste}
      containerStyle={{ display: "flex", alignItems: "center" }}
      renderSeparator={() => <Separator className={separatorClassName} />}
      renderInput={(p) => <FieldInput {...p} className={fieldClassName} />}
      {...props}
    />
  );
};

export default OtpInput;
