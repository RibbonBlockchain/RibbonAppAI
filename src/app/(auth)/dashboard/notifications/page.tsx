"use client";

import React from "react";
import { useGetUserNotifications } from "@/api/user";
import BackArrowButton from "@/components/button/back-arrow";
import NoNotification from "@/containers/notifications/no-notification";
import DisplayNotification from "@/containers/notifications/display-notification";

const Notifications = () => {
  const { data: notifications } = useGetUserNotifications();

  return (
    <div className="p-4 sm:p-6 w-full h-screen text-white bg-[#0B0228]">
      <div className="">
        <BackArrowButton stroke="#fff" />
        <div className="flex -mt-10 flex-row items-center justify-center text-lg font-semibold">
          Notifications
        </div>
      </div>

      <div className="">
        {notifications?.data.length >= 1 ? (
          <div className="h-auto flex flex-col my-10">
            <DisplayNotification />
          </div>
        ) : (
          <NoNotification />
        )}
      </div>
    </div>
  );
};

export default Notifications;
