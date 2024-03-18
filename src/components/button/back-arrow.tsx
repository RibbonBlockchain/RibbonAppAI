"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = { onClick?: () => void };

const BackArrowButton = ({ onClick }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
    if (onClick) onClick();
  };

  return (
    <div className="flex py-4 w-[40px] cursor-pointer" onClick={handleBack}>
      <ArrowLeft className="text-slate-700" />
    </div>
  );
};

export default BackArrowButton;
