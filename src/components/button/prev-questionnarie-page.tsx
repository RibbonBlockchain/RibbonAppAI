"use client";

import { ArrowLeft } from "lucide-react";

type Props = { onClick?: () => void; disabled?: boolean };

const PrevQuestionnairePageButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      className="flex py-4 w-[40px] cursor-pointer"
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowLeft className="text-slate-700" />
    </button>
  );
};

export default PrevQuestionnairePageButton;
