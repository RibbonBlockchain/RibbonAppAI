import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Message } from "iconsax-react";
import { Heart, Repeat } from "lucide-react";
import { useLikeNotification } from "@/api/user";
import ShareTimeline from "./share-modal";

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
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useLikeNotification();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);

    mutate(id as string, {
      onSuccess: () => {
        console.log("Liked a notification");
      },
    });
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border-b border-[#FFFFFF14] pb-4">
      <Link
        href={`/timeline/${id}`}
        className="w-full flex flex-row gap-3 py-3"
      >
        <Image
          src="/assets/ribbon.svg"
          alt="coin"
          height={32}
          width={32}
          className="w-[32px] h-[32px] rounded-full bg-white p-[2px]"
        />

        <div className="w-full flex flex-col text-[15px] gap-2">
          <div className="flex flex-row gap-2 items-center justify-between">
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
        </div>
      </Link>

      <div className="flex flex-row items-center px-10 justify-between text-[#FFFFFF80] text-[11px] font-semibold">
        <Link
          href={`/timeline/${id}`}
          className="flex flex-row gap-1.5 items-center justify-center"
        >
          <Message size={18} width={18} height={18} fill="#FFFFFF80" />{" "}
          {comments}
        </Link>

        <div
          className="flex flex-row gap-1.5 items-center justify-center"
          onClick={handleLikeClick}
        >
          <Heart
            size={18}
            width={18}
            height={18}
            fill={isLiked ? "red" : "#0B0228"}
          />
          {likes}
        </div>

        <div
          className="flex flex-row gap-1.5 items-center"
          onClick={handleShareClick}
        >
          <Repeat size={18} width={18} height={18} fill="#0B0228" /> {shares}
        </div>
      </div>

      {isModalOpen && (
        <ShareTimeline
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          inviteLink={`/timeline/${id}`}
          title={title}
          note={`Check out this update on our web app!`}
        />
      )}
    </div>
  );
};

export default TimelineCard;
