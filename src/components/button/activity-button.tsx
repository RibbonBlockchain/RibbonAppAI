import clsx from "clsx";
import React from "react";

const ActivityButton = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  return (
    <button className={clsx("py-2 px-6 font-bold rounded-full", className)}>
      {text}
    </button>
  );
};

export default ActivityButton;
