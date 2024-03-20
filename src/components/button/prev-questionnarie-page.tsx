"use client";

import { ArrowLeft } from "lucide-react";

type Props = { onClick?: () => void };

const PrevQuestionnairePageButton = ({ onClick }: Props) => {
  return (
    <div className="flex py-4 w-[40px] cursor-pointer" onClick={onClick}>
      <ArrowLeft className="text-slate-700" />
    </div>
  );
};

export default PrevQuestionnairePageButton;
