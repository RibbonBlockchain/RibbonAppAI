import { cn } from "@/app/lib/helpers";
import { SpinnerIcon } from "../icons/spinner";
import React, { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<{}> & { loading?: boolean };

const Button: React.FC<Props> = ({
  onClick,
  loading,
  disabled,
  children,
  className = "",
  ...props
}) => {
  disabled = disabled || loading;

  const handleClick = (e: any) => {
    if (disabled || !onClick || loading) return;
    onClick(e);
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "flex gap-3 items-center justify-center w-full text-sm font-semibold text-center p-4 rounded-xl border-2 shadow-sm transition-colors duration-100 focus-visible:duration-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-solid disabled:cursor-not-allowed border-blue-500 bg-blue-500 text-white hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-offset-white focus-visible:ring-gray-300 disabled:border-stone-300 disabled:bg-stone-400/50",
        className
      )}
      {...props}
    >
      {loading && <SpinnerIcon />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
