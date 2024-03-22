import React from "react";
import { NotificationsIcon } from "../../../public/images";

const NoCompltedTask = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center gap-2 justify-center">
      <NotificationsIcon />
      <p className="text-[22px] font-medium">No completed task yet</p>
      <p className="text-sm text-[#434343] text-center">
        Your completed tasks will be displayed here
      </p>
    </div>
  );
};

export default NoCompltedTask;
