import React from "react";
import { StarIcon } from "lucide-react";
import { SadEmoji } from "@/public/images";
import { formatDateAndTimeAgo } from "@/lib/values/format-dateandtime-ago";

const Notification = () => {
  const notifications = [
    {
      id: 1,
      message: "You just completed employment questionnare",
      type: "questionnaire",
      date: "2024-04-20T07:23:43.547Z",
      instruction: "Please rate your experience",
    },
    {
      id: 2,
      message: "You have a pending questionnaire",
      type: "pending",
      date: "2024-04-20T02:23:43.547Z",
      instruction: "Click here to complete your questionnaire now",
    },
    {
      id: 3,
      message: "You just completed employment questionnare",
      type: "questionnaire",
      date: "2024-04-20T08:20:43.547Z",
      instruction: "Please rate your experience",
    },
    {
      id: 4,
      message: "You have a pending questionnaire",
      type: "pending",
      date: "2024-04-21T08:23:43.547Z",
      instruction: "Click here to complete your questionnaire now",
    },
  ];

  return (
    <>
      <p className="text-xs font-bold mb-3">Today</p>
      {notifications.map((i: any) => (
        <div key={i.id} className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 items-center pb-3 border-b-[2px] border-gray-200">
            <div className="w-[50px] flex items-center justify-center self-center">
              {i.type === "questionnaire" ? (
                <StarIcon fill="#7C56FE" stroke="#7C56FE" />
              ) : (
                <SadEmoji />
              )}
            </div>

            <div className="flex flex-col mt-2 gap-y-1">
              <p className="text-sm font-normal">{i.message}</p>
              <p className="text-sm font-medium">{i.instruction}</p>
              <p className="text-sm font-normal text-[#626262]">
                {formatDateAndTimeAgo(i.date as string).relativeTime}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notification;
