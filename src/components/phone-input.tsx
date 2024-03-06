"use client";

import React from "react";
import ReactPhoneInput from "react-phone-input-2";

type Props = {
  value: string;
  country: string;
  setValue: (v: string) => void;
};

const PhoneInput = ({ value, country, setValue }: Props) => {
  return (
    <ReactPhoneInput
      value={value}
      specialLabel=""
      onChange={setValue}
      placeholder="+12133734253"
      countryCodeEditable={false}
      country={country?.toLowerCase()}
      inputClass="py-4 bg-transparent outline-none border-[1px] rounded-xl w-full border-gray-300 px-3"
    />
  );
};

export default PhoneInput;
