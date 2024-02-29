"use client";

import React, { useRef } from "react";

const OtpInput = () => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, e: any) => {
    const input = e.target;

    if (input.value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
    if (input.value.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex flex-row gap-1.5 px-1.5 my-2">
      {inputRefs.map((inputRef, index) => (
        <input
          key={index}
          type="number"
          maxLength={1}
          ref={inputRef}
          onChange={(e) => handleInputChange(index, e)}
          className="w-[40px] h-[40px] py-3.5 text-center text-base text-[#141414] border-[1px] border-[#B3B3B3] rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
