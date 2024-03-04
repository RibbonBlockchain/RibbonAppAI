import React from "react";
import Image from "next/image";
import { Clock4, Coins } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";

type Props = {
  score: number;
  reward: number;
  taskTitle: string;
  priority?: number;
  approximateTime: number;

  ratings?: number;
  ratingsLevel?: string;
};

const Todo = (props: Props) => {
  return (
    <div
      className={`${
        props.priority === 1
          ? "bg-[#D8EBFF]"
          : props.priority === 2
          ? "bg-[#FFE9E7]"
          : "bg-white"
      } w-full p-2.5 flex flex-row self-center items-center justify-between rounded-lg mb-3`}
    >
      <div className="flex flex-row items-start justify-start text-black gap-1">
        <div className="flex flex-col text-xs gap-[2px]">
          <p className="font-extrabold">{props.taskTitle}</p>
          <div className="flex flex-row items-center">
            <p className="text-[#626262] mr-1.5">Score +{props.score} pts</p>
            <ProgressBar
              height="7px"
              width="60px"
              labelSize="10px"
              maxCompleted={100}
              isLabelVisible={false}
              completed={props.score}
            />
          </div>
          {props.ratingsLevel && (
            <div>
              <Image
                width={75}
                height={17}
                alt="ratings"
                src={props.ratingsLevel}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-[3px] text-[10px]">
          <Clock4 size={10} />~
          <p className="font-extrabold">
            {props.approximateTime} <span className="font-normal">mins</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="text-[#626262] text-xs font-medium self-end">Reward</p>
        <div className="flex flex-row gap-1 text-[#A81DA6] items-center self-end text-sm font-black">
          <Coins size={10} /> {props.reward} WLD
        </div>
        {props.ratings && (
          <p className="text-[10px] font-medium text-[#626262]">
            ({props.ratings}) Ratings
          </p>
        )}
      </div>
    </div>
  );
};

export default Todo;
