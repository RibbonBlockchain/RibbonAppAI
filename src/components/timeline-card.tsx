import React from "react";
import Image from "next/image";
import { Message } from "iconsax-react";
import { Heart, Repeat } from "lucide-react";
import Link from "next/link";

interface TimelineCardProps {
  image: string | null;
  title: string;
  time: string;
  description: string;
  comments: string;
  likes: string;
  shares: string;
  id: number | string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  image,
  title,
  time,
  description,
  comments,
  likes,
  shares,
  id,
}) => {
  return (
    <Link href={`/timeline/${id}`}>
      <div className="flex flex-row gap-3 py-5 border-b border-[#FFFFFF14]">
        <Image
          src="/assets/ribbon.svg"
          alt="coin"
          height={32}
          width={32}
          className="w-[32px] h-[32px] rounded-full bg-white p-[2px]"
        />

        <div className="flex flex-col text-[15px] gap-2">
          <div className="flex flex-row gap-2">
            <p className="font-extrabold">{title}</p>
            <p className="font-medium text-[#FFFFFF80]">. {time}</p>
          </div>

          {image && (
            <div className="w-full h-[180px]">
              <Image
                src={image}
                alt="coin"
                height={180}
                width={280}
                className="w-full max-w-[300px] h-[180px] rounded-md bg-white p-[2px]"
              />
            </div>
          )}

          <h3 className="font-normal">{description}</h3>

          <div className="flex flex-row items-center justify-between text-[#FFFFFF80] text-[10px] font-semibold">
            <div className="flex flex-row gap-1.5 items-center">
              <Message size={18} width={18} height={18} fill="#FFFFFF80" />{" "}
              {comments}
            </div>
            <div className="flex flex-row gap-1.5 items-center">
              <Heart size={18} width={18} height={18} fill="#FFFFFF80" />{" "}
              {likes}
            </div>
            <div className="flex flex-row gap-1.5 items-center">
              <Repeat size={18} width={18} height={18} fill="#FFFFFF80" />{" "}
              {shares}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TimelineCard;

export const testData: TimelineCardProps[] = [
  {
    image: "/assets/ribbon.svg",
    title: "Ribbon 1",
    time: "3h",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius aliquet urna eget sed in eget.",
    comments: "5.7k",
    likes: "5.7k",
    shares: "5.7k",
    id: 1,
  },
  {
    image: null,
    title: "Ribbon 2",
    time: "1d",
    description:
      "Adipiscing id nec in sed aliquet. Nunc etiam ut dui justo egestas maecenas.",
    comments: "4.2k",
    likes: "4.2k",
    shares: "4.2k",
    id: 2,
  },
  {
    image: "/assets/ribbon.svg",
    title: "Ribbon 3",
    time: "5h",
    description:
      "Dolor ac sed arcu sed tristique dictum. Nisi tellus gravida tellus dui lectus dignissim.",
    comments: "3.1k",
    likes: "3.1k",
    shares: "3.1k",
    id: 3,
  },
  {
    image: "/assets/ribbon.svg",
    title: "Ribbon 4",
    time: "2d",
    description:
      "Velit id imperdiet non. Donec tempor ante ac tincidunt tincidunt.",
    comments: "6.5k",
    likes: "6.5k",
    shares: "6.5k",
    id: 4,
  },
  {
    image: null,
    title: "Ribbon 5",
    time: "10h",
    description:
      "Sed at sollicitudin nisi. Quisque suscipit urna et leo egestas.",
    comments: "2.3k",
    likes: "2.3k",
    shares: "2.3k",
    id: 5,
  },
];
