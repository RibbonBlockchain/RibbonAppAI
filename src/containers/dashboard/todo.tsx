import React from "react";
import Image from "next/image";
import { Clock4 } from "lucide-react";
import CoinSVG from "../../../public/images/coin";
import ProgressBar from "@ramonak/react-progress-bar";

type Props = {
  score: number;
  reward: number;
  taskTitle: string;
  priority?: boolean;
  approximateTime: number;
  completed?: boolean;
  icon: string | undefined;

  ratings?: number;
  ratingsLevel?: string;
};

const Todo = (props: Props) => {
  return (
    <div
      className={`${
        props.priority
          ? "bg-[#EDE8F5]"
          : "bg-white border-[1px] border-[#E8E8E8]"
      }   w-full p-2.5 flex flex-row self-center items-center justify-between rounded-lg mb-3`}
    >
      <div className="flex flex-row items-start justify-start text-black gap-1">
        {props.icon === undefined && <></>}
        {props.icon && (
          <Image src={props.icon} alt="icons" height={32} width={32} />
        )}

        <div className="flex flex-col text-xs gap-[3px]">
          <p
            className={`font-extrabold ${
              props.priority ? "text-black" : "text-gradient-2"
            }`}
          >
            {props.taskTitle}
          </p>
          <div className="flex flex-row items-center">
            <p className="text-[#434343] mr-1.5">Score +{props.score} pts</p>

            {props.priority ? (
              <> </>
            ) : (
              <ProgressBar
                height="7px"
                width="60px"
                labelSize="10px"
                maxCompleted={100}
                isLabelVisible={false}
                completed={props.score}
              />
            )}
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
      <div className="flex flex-col gap-[3px]">
        <p className="text-[#626262] text-xs font-medium self-end">Reward</p>
        <div
          className={`text-[#A81DA6] flex flex-row gap-1 items-center self-end text-sm font-black`}
        >
          <CoinSVG width={12} height={13} fill={`#A81DA6`} />
          {props.reward} WLD
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
