"use client";

import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = { onClick?: () => void; stroke?: string; className?: string };

const BackArrowButton = ({ onClick, stroke, className }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
    if (onClick) onClick();
  };

  return (
    <div
      className={clsx(className, "flex py-4 w-[40px] cursor-pointer")}
      onClick={handleBack}
    >
      <ArrowLeft stroke={stroke} />
    </div>
  );
};

export default BackArrowButton;
