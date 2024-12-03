import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock4 } from "lucide-react";
import RatingCompleted from "../activity/rate-completed";

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

  ratings: number;
  totalRatings?: string;
};

const Pending = (props: Props) => {
  const rewardPoints = props.reward * 5000;

  return (
    <Link
      href={props.href}
      id={props.id}
      className={`${
        props.priority ? "bg-[#EDE8F5]" : "bg-[#3B3247] rounded-md"
      }   w-full p-2.5 flex flex-row text-white self-center items-center justify-between rounded-lg mb-3`}
    >
      <div className="flex flex-row items-start justify-start gap-1">
        {props.icon === undefined && <></>}
        {props.icon && (
          <Image src={props.icon} alt="icons" height={32} width={32} />
        )}

        <div className="flex flex-col text-xs gap-[3px]">
          <h1
            className={`font-extrabold whitespace-nowrap truncate max-w-[130px] xxs:max-w-[150px] xs:max-w-[170px] ${
              props.priority ? "text-white" : "text-white"
            }`}
          >
            {props.taskTitle}
          </h1>

          <div className="flex flex-row items-center text-[11px]">
            <p>Claim {rewardPoints.toLocaleString()} ribbon</p>
          </div>
          {<RatingCompleted rating={props.ratings} />}
        </div>
      </div>

      <div className="flex items-center justify-start self-start gap-[3px] text-[#F59E0B] text-[10px]">
        <Clock4 size={10} stroke="#F59E0B" /> ~
        <p className="font-extrabold ">pending</p>
      </div>

      <div className="flex flex-col gap-[3px]">
        <p className="text-xs font-medium self-end">Reward</p>
        <div
          className={`text-[#A81DA6] flex flex-row gap-1 items-center self-end text-sm font-black`}
        >
          <Image
            alt="coin"
            width={32}
            height={32}
            src="/assets/coin.png"
            className="w-[32px] h-[32px] -ml-2 -mr-2"
          />
          {props.reward} ribbon
        </div>
        {
          <p className="text-[10px] font-medium self-end">
            ({props.totalRatings}) Ratings
          </p>
        }
      </div>
    </Link>
  );
};

export default Pending;
