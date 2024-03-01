"use client";
import React from "react";
import ReactPhoneInput from "react-phone-input-2";

type Props = {
  value: string;
  countryCode: string;
  setValue: (v: string) => void;
};

const PhoneInput = ({ value, countryCode, setValue }: Props) => {
  return (
    <ReactPhoneInput
      value={value}
      specialLabel=""
      onChange={setValue}
      placeholder="+12133734253"
      countryCodeEditable={false}
      country={countryCode?.toLowerCase()}
      inputClass="py-4 bg-transparent outline-none border-[1px] rounded-xl w-full border-gray-300 px-3"
    />
  );
};

export default PhoneInput;
