"use client";

import React from "react";
import Image from "next/image";
import LinkButton from "@/components/button/link";
import { Check, RibbonLight } from "../../../public/images";
import BackArrowButton from "@/components/button/back-arrow";

const SelectOptions = ({
  options,
  question,
  instruction,
}: {
  question: string;
  options: string[];
  instruction: string;
}) => {
  const [selected, setSelected] = React.useState("");

  //   const options = [
  //     "Chronic Bronchitis",
  //     "Emphysema",
  //     "Tuberculosis",
  //     "Lung Cancer",
  //     "Pulmonary Embolism",
  //     "Pneumonia",
  //     "Pulmonary Fibrosis",
  //     "Asthma",
  //   ];

  return (
    <div className="relative flex flex-col h-[inherit] items-start justify-between p-4 sm:p-6">
      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute top-0 left-10"
      />

      <div className="flex flex-col">
        <div className="w-full flex flex-row gap-20 items-center justify-start">
          <BackArrowButton />
          <RibbonLight />
        </div>

        <div className="py-6">000000000000000000000</div>

        <div className="">
          <h1 className="font-semibold text-[22px] leading-9 text-start">
            {question}
          </h1>
          <p className="leading-9 font-normal text-[16px]">{instruction}</p>
        </div>

        <div className="w-full my-10 grid grid-cols-2 gap-6 items-center justify-center">
          {options.map((text) => {
            return (
              <div
                key={text}
                onClick={() => [
                  setSelected(text),
                  // console.log(text, "selected"),
                ]}
                className={`w-fit text-center rounded-full px-3 py-1.5  border-[1px] border-[#7C56FE]`}
              >
                {text}
              </div>
            );
          })}
        </div>
      </div>

      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute self-end justify-center top-[37vh]"
      />

      <LinkButton
        href={"#"}
        className="w-[50%] self-center flex items-center justify-center text-white mb-6 bg-gradient-to-r from-[#714EE7] to-[#A81DA6]"
      >
        <Check />
      </LinkButton>

      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute self-start justify-start left-5 bottom-28"
      />
    </div>
  );
};

export default SelectOptions;
