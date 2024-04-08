import React from "react";
import { StarIcon } from "lucide-react";
import { SadEmoji } from "@/public/images";

const Notification = () => {
  const notifications = [{}];
  return (
    <>
      {notifications.map((i: any) => (
        <div key={i} className="flex flex-col gap-3">
          <p className="text-xs font-bold">Today</p>
          <div className="flex flex-row gap-3 items-center pb-3 border-b-[2px] border-gray-200">
            <div className="w-[50px] flex items-center justify-center self-center">
              <StarIcon fill="#7C56FE" stroke="#7C56FE" />
            </div>

            <div className="flex flex-col mt-2">
              <p className="text-sm font-normal">
                You just completed employment task
              </p>
              <p className="text-base font-medium">
                Please rate your experience
              </p>
              <p className="text-sm font-normal text-[#626262]">2 hours ago</p>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center pb-3 border-b-[2px] border-gray-200">
            <div className="w-[50px] flex items-center justify-center self-center">
              <SadEmoji />
            </div>
            <div className="flex flex-col mt-2">
              <p className="text-sm font-normal">You have a pending task</p>
              <p className="text-base font-medium">
                Click complete your task now
              </p>
              <p className="text-sm font-normal text-[#626262]">2 hours ago</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notification;
