import React from "react";
import Image from "next/image";
import { Message } from "iconsax-react";
import { Heart, Repeat } from "lucide-react";
import Link from "next/link";

interface ReplyCardProps {
  title: string;
  time: string;
  description: string;
  comments: string;
  likes: string;
  shares: string;
  id: number | string;
}

const ReplyCards: React.FC<ReplyCardProps> = ({
  title,
  time,
  description,
  comments,
  likes,
  shares,
  id,
}) => {
  return (
    <div className="flex flex-row gap-3 py-3 border-b border-[#FFFFFF14]">
      <Image
        src="/assets/sample-icon.png"
        alt="coin"
        height={34}
        width={34}
        className="w-[38px] h-[38px] rounded-full p-[2px]"
      />

      <div className="flex flex-col text-[15px] gap-1.5">
        <p className="font-extrabold">{title}</p>

        <h3 className="font-normal">{description}</h3>

        <div className="flex flex-row items-center justify-between text-[#FFFFFF80] text-[10px] font-semibold">
          <p className="text-xs font-medium text-[#FFFFFF80]">{time}</p>
          {/* <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-row gap-1.5 items-center">
              <Heart size={18} width={18} height={18} fill="#FFFFFF80" />{" "}
              {likes}
            </div>
            <div className="flex flex-row gap-1.5 items-center">
              <Message size={18} width={18} height={18} fill="#FFFFFF80" />{" "}
              {comments}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ReplyCards;
