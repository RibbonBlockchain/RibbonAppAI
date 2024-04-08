import React from "react";
import BackArrowButton from "@/components/button/back-arrow";
import Notification from "@/containers/notifications/notifications";
import NoNotification from "@/containers/notifications/no-notification";

const Notifications = () => {
  const notifications = [{}];

  return (
    <div className="p-4 sm:p-6">
      <div className="">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10 flex-row items-center justify-center text-lg font-semibold">
          Notifications
        </div>
      </div>

      <div className="">
        {notifications?.length >= 1 ? (
          <div className="h-auto flex flex-col my-10">
            <Notification />
          </div>
        ) : (
          <NoNotification />
        )}
      </div>
    </div>
  );
};

export default Notifications;
