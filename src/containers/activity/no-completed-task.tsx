import React from "react";
import { SadEmoji } from "../../../public/images";

export const NoCompletedTaskOnDate = ({ onclick }: { onclick: () => void }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center gap-2 justify-center">
      <SadEmoji />
      <p className="text-[20px] font-medium text-center">
        You do not have any completed task on this date
      </p>
      <p className="text-sm text-[#434343] text-center">
        Your completed tasks will be displayed here
      </p>
      <p
        onClick={onclick}
        className="text-sm text-[#714EE7] font-bold pt-3 text-center cursor-pointer"
      >
        See all completed tasks
      </p>
    </div>
  );
};

const NoCompletedTask = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center gap-2 justify-center">
      <SadEmoji />
      <p className="text-[22px] font-medium">No completed task yet</p>
      <p className="text-sm text-[#434343] text-center">
        Your completed tasks will be displayed here
      </p>
    </div>
  );
};

export default NoCompletedTask;
