"use client";

import React from "react";
import Image from "next/image";
import { InfoIcon } from "lucide-react";
import LinkButton from "@/components/button/link";
import ProgressBar from "@ramonak/react-progress-bar";
import { Check, RibbonLight } from "../../../public/images";
import BackArrowButton from "@/components/button/back-arrow";
import InputBox from "@/components/questionnarie/input-box";
import RadioSelect from "@/components/questionnarie/radio-select";

interface InputType {
  label: string;
  required: boolean;
}

const FillInfo = ({
  task,
  questions,
  instruction,
}: {
  task: string;
  instruction: string;
  questions: InputType[];
}) => {
  const [value, setValue] = React.useState({
    firstName: "",
    lastName: "",
    otherNames: "",
  });
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const step = 1;
  const no_of_steps = 4;

  const options = [
    "Yes, I smoke",
    "No, I don’t smoke",
    "Yes, but i smoke occassionally",
  ];

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

        <div className="mt-6 mb-4 flex flex-row gap-2 items-center justify-center">
          <p className="text-xs text-[#939393]">
            {step}/{no_of_steps}
          </p>
          <div className="w-full">
            <ProgressBar
              height="3px"
              completed={step}
              labelSize="10px"
              isLabelVisible={false}
              maxCompleted={no_of_steps}
            />
          </div>
        </div>

        <div className="mb-10 flex flex-row items-center justify-center gap-2 p-2 text-[11px] font-normal bg-[#F2EEFF] rounded-md">
          <InfoIcon stroke="#7C56FE" width={32} height={32} />
          Answering these questions and completing your profile will help us
          with finding the right surveys for you.
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="font-normal text-lg">{task}</h1>
          <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
            {instruction}
          </p>
        </div>

        <div className="w-full my-10 flex flex-col gap-2 justify-center">
          {/* example with page */}
          <InputBox
            value={value.firstName}
            label={"First Name"}
            required={true}
            onChange={handleChange}
          />
          <InputBox
            value={value.lastName}
            label={"Last Name"}
            required={true}
            onChange={handleChange}
          />
          <InputBox
            value={value.otherNames}
            label={"Other Names"}
            required={false}
            onChange={handleChange}
          />
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

export default FillInfo;
