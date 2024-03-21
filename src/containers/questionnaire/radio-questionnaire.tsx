"use client";

import React from "react";
import { InfoIcon } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Check, RibbonLight } from "../../../public/images";
import BgEffect from "@/components/questionnarie/bg-effect";
import PrevQuestionnairePageButton from "@/components/button/prev-questionnarie-page";

const OptionSelectQuestionnarie = ({
  step,
  onclick,
  question,
  prevPage,
  children,
  instruction,
  no_of_steps,
  isProfile = false,
}: {
  step: number;
  question: string;
  no_of_steps: number;
  onclick: () => void;
  instruction?: string;
  prevPage: () => void;
  isProfile?: boolean;
  children: React.ReactElement;
}) => {
  return (
    <div className="relative flex flex-col min-h-[100vh] items-start justify-between p-4 sm:p-6">
      <BgEffect />

      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-20 items-center justify-start">
          <PrevQuestionnairePageButton onClick={prevPage} />
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

        {isProfile && (
          <div className="mb-10 flex flex-row items-center justify-center gap-2 p-2 text-[11px] font-normal bg-[#F2EEFF] rounded-md">
            <InfoIcon stroke="#7C56FE" width={32} height={32} />
            Answering these questions and completing your profile will help us
            with finding the right surveys for you.
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="font-normal text-lg text-center">{question}</h1>
          <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
            {instruction}
          </p>
        </div>

        <div className="mt-14">{children}</div>
      </div>

      <div className="flex justify-center w-full  mb-2">
        <div
          onClick={onclick}
          className="flex w-[12rem] items-center justify-center text-white bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-sm font-semibold p-4 rounded-[35px] border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 bg-gray-100 hover:bg-gray-300 focus-visible:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
        >
          <Check />
        </div>
      </div>
    </div>
  );
};

export default OptionSelectQuestionnarie;
