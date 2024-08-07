import React from "react";
import Image from "next/image";
// import NumberLine from "../dashboard/number-line";
import ProgressBar from "@ramonak/react-progress-bar";
import { Clock4 } from "lucide-react";

const CoompletedSurvey = () => {
  return (
    <div className="bg-[#E8E8E8] w-full text-[#626262] p-4 flex flex-row gap-3 self-start items-center justify-between rounded-lg mb-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-6">
          <p className="text-xs font-medium"> HEALTH SURVEYS</p>
          <div className="flex items-center gap-[3px] text-[10px]">
            <Clock4 size={10} />~
            <p className="font-extrabold">
              8 <span className="font-normal">mins</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-3">
            <p className="text-base font-extrabold leading-7">
              Complete 5 surveys and Earn more 7 WLD
            </p>
            <div className="w-full">
              <ProgressBar
                height="15px"
                width="auto"
                completed={5}
                labelSize="10px"
                maxCompleted={5}
                isLabelVisible={false}
                completedClassName="barCompleted"
              />
              {/* <NumberLine /> */}
            </div>
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
