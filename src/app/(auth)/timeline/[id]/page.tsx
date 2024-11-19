"use client";

import Image from "next/image";
import { Heart, Repeat } from "lucide-react";
import { ArrowLeft2, Message } from "iconsax-react";
import Topbar from "@/containers/dashboard/top-bar";
import { useRouter, useParams } from "next/navigation";
import ReplyCards, { replyData } from "@/components/timeline/reply-cards";

const TimelineDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const timeline = {
    image: "/assets/ribbon.svg",
    title: "Ribbon 3",
    time: "5h",
    description:
      "Dolor ac sed arcu sed tristique dictum. Nisi tellus gravida tellus dui lectus dignissim.",
    comments: "3.1k",
    likes: "3.1k",
    shares: "3.1k",
    id: 3,
  };
  if (!timeline) {
    return <div>Timeline not found</div>;
  }

  const { title, image, time, description, comments, likes, shares } = timeline;

  const date = new Date().toLocaleDateString();
  const formattedTime = `${time}`;
  return (
    <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 ">
      <div className="flex flex-row items-center">
        <ArrowLeft2 onClick={() => router.back()} className="mt-3" />
        <Topbar>
          <p className="text-xl font-bold">Timeline</p>
        </Topbar>
      </div>

      <section className="mb-10">
        <div className="flex flex-col gap-3 py-5 border-b border-[#FFFFFF14]">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/assets/ribbon.svg"
              alt="coin"
              height={32}
              width={32}
              className="w-[32px] h-[32px] rounded-full bg-white p-[2px]"
            />
            <p className="text-[15px] font-extrabold">{title}</p>
          </div>

          <div className="flex flex-col text-[15px] gap-2">
            {image && (
              <div className="w-full h-[180px]">
                <Image
                  src={image}
                  alt="Timeline Image"
                  height={180}
                  width={280}
                  className="w-full max-w-[300px] h-[180px] rounded-md bg-white p-[2px]"
                />
              </div>
            )}

            <h3 className="font-normal">{description}</h3>

            <h4 className="flex flex-row gap-2">
              <p className="font-medium text-[#FFFFFF80]">8:08 AM</p> .
              <p className="font-medium text-[#FFFFFF80]">{date}</p>
            </h4>

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

        <div className="space-y-4">
          {replyData.map((data, index) => (
            <ReplyCards key={index} {...data} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default TimelineDetail;
