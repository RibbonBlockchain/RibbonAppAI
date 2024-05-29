import React from "react";
import { Clock4 } from "lucide-react";
import CoinSVG from "../../../public/images/coin";
import RatingCompleted from "./rate-completed";

type Props = {
  score: number;
  reward: number;
  taskTitle: string;
  priority?: boolean;
  approximateTime: number;
  completed?: string;

  ratings?: number;
  ratingsLevel?: number;
};

const TodoCompletedForm = (props: Props) => {
  const rewardPoints = props.reward * 5000;

  return (
    <div
      className={`bg-[#FFFFFF] dark:bg-[#282729] border-[1px] border-[#fcfcfc] dark:border-[#282729] text-[#626262] w-full p-2.5 flex flex-row self-center items-center justify-between rounded-lg mb-3`}
    >
      <div className="flex flex-row items-start justify-start gap-1 dark:text-white">
        <div className="flex flex-col text-xs gap-[3px]">
          <p className="font-extrabold whitespace-nowrap truncate max-w-[130px] xxs:max-w-[150px] xs:max-w-[170px]">
            {props.taskTitle}
          </p>
          <div className="flex flex-row items-center">
            <p className="mr-1.5 dark:text-[#939393]">
              Earned {rewardPoints.toLocaleString()} points
            </p>
          </div>

          <RatingCompleted rating={props.ratingsLevel || 0} />
        </div>
      </div>

      <div className="flex items-center justify-start self-start gap-[3px] text-[10px] dark:text-white ">
        <Clock4 size={10} />~
        <p className="font-extrabold">
          {props.approximateTime} <span className="font-normal">mins</span>
        </p>
      </div>

      <div className="flex flex-col gap-[3px]">
        <p className="text-[#626262] dark:text-white text-xs font-medium self-end">
          Reward
        </p>
        <div
          className={`flex flex-row gap-1 items-center self-end text-sm font-black dark:text-[#939393] `}
        >
          <CoinSVG width={12} height={13} fill={`#626262`} />
          {props.reward} WLD
        </div>
        {props.ratings && (
          <p className="text-[10px] font-medium text-[#626262] dark:text-white">
            ({props.ratings}) Ratings
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoCompletedForm;
