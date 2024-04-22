import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock4 } from "lucide-react";
import CoinSVG from "../../../public/images/coin";

type Props = {
  id: string;
  href: string;
  score: number;
  reward: number;
  taskTitle: string;
  priority?: boolean;
  completed?: boolean;
  approximateTime: number;
  icon: string | undefined;

  ratings?: number;
  ratingsLevel?: string;
};

const Todo = (props: Props) => {
  const rewardPoints = props.reward * 5000;

  return (
    <div
      id={props.id}
      className={`${
        props.priority
          ? "bg-[#EDE8F5]"
          : "bg-white border-[1px] border-[#f1f1f1]"
      }   w-full p-2.5 flex flex-row self-center items-center justify-between rounded-lg mb-3`}
    >
      <div className="flex flex-row items-start justify-start text-black gap-1">
        {props.icon === undefined && <></>}
        {props.icon && (
          <Image src={props.icon} alt="icons" height={32} width={32} />
        )}

        <div className="flex flex-col text-xs gap-[3px]">
          <Link
            href={props.href}
            className={`font-extrabold whitespace-nowrap truncate max-w-[130px] xxs:max-w-[150px] xs:max-w-[170px] ${
              props.priority ? "text-black" : "text-gradient-2"
            }`}
          >
            {props.taskTitle} questionnaire
          </Link>

          <div className="flex flex-row items-center text-[11px]">
            <p className="text-[#434343]">
              Claim {rewardPoints.toLocaleString()} points
            </p>
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
      </div>

      <div className="flex items-center justify-start self-start gap-[3px] text-[10px]">
        <Clock4 size={10} />~
        <p className="font-extrabold">
          {props.approximateTime} <span className="font-normal">mins</span>
        </p>
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
