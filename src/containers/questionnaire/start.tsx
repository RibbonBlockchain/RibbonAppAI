"use client";

import Image from "next/image";
import BgFffect from "@/components/questionnarie/bg-effect";
import BackArrowButton from "@/components/button/back-arrow";

const BeginQuestionnaire = ({
  reward,
  onclick,
  imageUrl,
  description,
  rewardPoints,
  completionTime,
  rewardPointText,
}: {
  imageUrl: string;
  description: string;
  onclick: () => void;
  reward: string | number;
  rewardPointText?: string;
  rewardPoints: string | number;
  completionTime: string | number;
}) => {
  return (
    <div className="relative flex -mt-2 flex-col h-[inherit] items-start justify-center p-4 sm:p-6">
      <BgFffect />

      <div className="flex flex-col items-center justify-around w-full min-h-[85vh]">
        <div className="w-full flex flex-col items-start justify-center">
          {/* <BackArrowButton /> */}
          <Image
            width={150}
            height={150}
            src={imageUrl}
            alt="question"
            className="mx-auto flex items-center self-center justify-center"
          />
        </div>

        <h1 className="flex flex-wrap w-screen items-center justify-center text-center gap-2 font-bold text-[22px] text-[#714EE7] ">
          <p className="whitespace-nowrap">{description}</p>
        </h1>

        <div className="grid gap-y-7 self-start">
          <div className="flex items-center gap-x-2">
            <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE] relative">
              <Image
                src="/images/questionnaire/coins.png"
                alt="coins"
                width={25}
                height={20}
                className=""
              />
            </div>
            <div>
              <h3 className="text-primary font-bold text-lg">{reward} WLD</h3>
              <p className="text-[#434343] text-[11px]">
                Complete the survey to earn a token of {reward} WLD
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE]">
              <Image
                width={25}
                alt="coins"
                height={20}
                className=""
                src="/images/questionnaire/cup.png"
              />
            </div>
            <div>
              <h3 className="text-primary font-bold text-lg">
                + {rewardPoints} points
              </h3>
              <p className="text-[#434343] text-[11px]">
                Earn {rewardPoints} points by completing this {description}
                survey
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE]">
              <Image
                src="/images/questionnaire/time.png"
                alt="coins"
                width={25}
                height={20}
              />
            </div>
            <div>
              <h3 className="text-primary font-bold text-lg">
                {completionTime} minute
              </h3>{" "}
              <p className="text-[#434343] text-[11px]">
                Complete this activity in just {completionTime} minute
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={onclick}
          className="w-full text-white bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-sm font-semibold text-center p-4 rounded-xl border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 bg-gray-100 hover:bg-gray-300 focus-visible:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
        >
          Start Questionnaire
        </div>
      </div>
    </div>
  );
};

export default BeginQuestionnaire;
