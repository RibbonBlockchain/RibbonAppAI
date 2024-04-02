import { HappyEmoji, SadEmoji } from "@/public/images";
import clsx from "clsx";
import React, { useEffect } from "react";

type TOptions = {
  id: number;
  text: string;
};

interface YesorNoOptionsProps {
  options: TOptions[];
  onOptionSelect: (id: number) => void;
}

const YesOrNo = ({ options, onOptionSelect }: YesorNoOptionsProps) => {
  const [selected, setSelected] = React.useState("");

  return (
    <div className="flex z-10 flex-row gap-12">
      {options.map((i: any) => (
        <div
          key={i.id}
          onClick={() => {
            setSelected(i.id), onOptionSelect(i.id);
          }}
          className={`flex mx-auto items-center justify-center border-[0.5px] border-[#7C56FE] shadow-lg w-full py-2 rounded-full px-3 ${
            selected === i.id ? "bg-purple-600" : "bg-white"
          }`}
        >
          {i.text === "Yes" ? <HappyEmoji /> : <SadEmoji />}
          <div className={clsx("flex flex-row text-nowrap py-1.5 px-2")}>
            {i.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default YesOrNo;
