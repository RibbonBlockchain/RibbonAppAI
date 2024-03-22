import React from "react";
import { NotificationsIcon } from "../../../public/images";

const NoInProgressTask = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center gap-2 justify-center">
      <NotificationsIcon />
      <p className="text-[22px] font-medium">No pending task yet</p>
      <p className="text-sm text-[#434343] text-center">
        Your pending tasks will be displayed here
      </p>
    </div>
  );
};

export default NoInProgressTask;
