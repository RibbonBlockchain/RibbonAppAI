import clsx from "clsx";
import React from "react";

const ActivityButton = ({
  text,
  className,
  onClick,
}: {
  text: string;
  className: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx("py-2 px-6 font-bold rounded-full", className)}
    >
      {text}
    </button>
  );
};

export default ActivityButton;
