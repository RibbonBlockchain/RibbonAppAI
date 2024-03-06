import React from "react";
import Image from "next/image";

const CoompletedSurvey = () => {
  return (
    <div className="bg-[#E8E8E8] w-full text-[#626262] p-4 flex flex-row gap-3 self-start items-center justify-between rounded-lg mb-3">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium"> HEALTH SURVEYS</p>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-3">
            <p className="text-base font-extrabold leading-7">
              Complete 5 surveys and Earn more 7 WLD
            </p>
            <Image
              width={180}
              height={25}
              alt="health-survey"
              src="/images/survey-steps.svg"
              className=""
            />
          </div>

          <Image
            width={108}
            height={105}
            alt="health-survey"
            src="/images/health.svg"
            className="rotate-37"
          />
        </div>
      </div>
    </div>
  );
};

export default CoompletedSurvey;
