import React from "react";
import BackArrow from "@/app/auth/login/sections/back";
import NoNotification from "@/containers/notifications/no-notification";

const Notifications = () => {
  const isThereNotification = false;

  return (
    <>
      <div className="flex flex-row items-center justify-start">
        <BackArrow />
        <h1 className="flex text-2xl font-bold self-center ml-6">
          Notifications
        </h1>
      </div>
      <div className="">
        {!isThereNotification ? (
          <NoNotification />
        ) : (
          <div className="h-auto flex flex-col my-5">Notifications</div>
        )}
      </div>
    </>
  );
};

export default Notifications;
