import React from "react";
import Image from "next/image";
import ProgressBar from "@ramonak/react-progress-bar";
import NumberLine from "./number-line";

const Survey = () => {
  let completed = "1";

  return (
    <div className="bg-[#FFE9E7] w-[85%] text-black p-4 flex flex-row gap-3 self-start items-center justify-between rounded-lg mb-3">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium"> HEALTH SURVEYS</p>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-3">
            <p className="text-base font-extrabold leading-7">
              Complete 5 surveys and Earn more 7 WLD
            </p>

            <div className="w-full">
              <ProgressBar
                height="15px"
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
            width={108}
            height={105}
            alt="health-survey"
            className="rotate-37"
            src="/images/health.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Survey;
