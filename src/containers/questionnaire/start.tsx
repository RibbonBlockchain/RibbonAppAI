"use client";

import Image from "next/image";
import BackArrowButton from "@/components/button/back-arrow";
import BgFffect from "@/components/questionnarie/bg-effect";

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
  rewardPointText: string;
  rewardPoints: string | number;
  completionTime: string | number;
}) => {
  return (
    <div className="relative flex flex-col h-[inherit] items-start justify-center p-4 sm:p-6">
      <BgFffect />

      <div className="flex flex-col items-center justify-between w-full min-h-[95vh]">
        <div className="w-full flex flex-col items-start gap-4 justify-center">
          <BackArrowButton />
          <Image
            width={234}
            height={241}
            src={imageUrl}
            alt="question"
            className="mx-auto flex items-center self-center justify-center"
          />
        </div>

        <div className="grid gap-y-10 self-start">
          <h1 className="font-bold text-[26px] text-center text-[#714EE7]">
            {description}
          </h1>

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
              <h3 className="text-primary font-bold text-xl">{reward} WLD</h3>
              <p className="text-[#434343] text-[0.75rem] mt-1">
                {description} for a token of {reward} WLD
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
              <h3 className="text-primary font-bold text-xl">
                + {rewardPoints} points
              </h3>
              <p className="text-[#434343] text-[0.75rem] mt-1">
                Earn {rewardPoints} points by {rewardPointText}
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
              <h3 className="text-primary font-bold text-xl">
                {completionTime} minute(s)
              </h3>{" "}
              <p className="text-[#434343] text-[0.75rem] mt-1">
                Complete this task in just {completionTime} minute(s)
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={onclick}
          className="w-full text-white mb-2 bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-sm font-semibold text-center p-4 rounded-xl border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 bg-gray-100 hover:bg-gray-300 focus-visible:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default BeginQuestionnaire;
