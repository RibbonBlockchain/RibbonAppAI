import React from "react";
import { NotificationsIcon } from "../../../public/images";

const NoNotification = () => {
  return (
    <div className="h-[80vh] max-w-[300px] m-auto gap-1 flex flex-col items-center justify-center">
      <NotificationsIcon />
      <p className="text-[22px] font-medium">No notifications yet</p>
      <p className="text-sm text-[#434343] dark:text-white text-center">
        You’ll get updates on new actions, when you withdraw and receive your
        tokens
      </p>
    </div>
  );
};

export default NoNotification;
