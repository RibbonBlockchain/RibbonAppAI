import React from "react";
import Image from "next/image";
import { Clock4 } from "lucide-react";
import NumberLine from "./number-line";
import ProgressBar from "@ramonak/react-progress-bar";

const Survey = () => {
  let completed = "1";

  return (
    <div className="bg-[#FFF] border-[1px] border-[#E8E8E8] w-full text-black p-4 flex flex-row gap-3 self-start items-center justify-between rounded-lg mb-3">
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
                height="8px"
                width="auto"
                labelSize="10px"
                maxCompleted={5}
                completed={completed}
                isLabelVisible={false}
                customLabel={completed}
              />
              <NumberLine />
            </div>
          </div>

          <Image
            width={148}
            height={105}
            alt="health-survey"
            className="rotate-37"
            src="/images/health-image.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Survey;
