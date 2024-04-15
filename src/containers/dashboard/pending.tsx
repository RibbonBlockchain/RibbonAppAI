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

const Pending = (props: Props) => {
  const rewardPoints = props.reward * 5000;

  return (
    <div
      id={props.id}
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
          <Link
            href={props.href}
            className={`font-extrabold ${
              props.priority ? "text-black" : "text-gradient-2"
            }`}
          >
            {props.taskTitle}
          </Link>

          <div className="flex flex-row items-center text-[11px]">
            <p className="text-[#434343]">
              Claim {rewardPoints.toLocaleString()} points
            </p>

            {/* {props.priority ? (
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
            )} */}
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

      <div className="flex items-center justify-start self-start gap-[3px] text-[#F59E0B] text-[10px]">
        <Clock4 size={10} stroke="#F59E0B" /> ~
        <p className="font-extrabold ">pending</p>
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

export default Pending;
