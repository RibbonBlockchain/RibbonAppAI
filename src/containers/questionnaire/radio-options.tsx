"use client";

import clsx from "clsx";
import React, { useState } from "react";

type TOptions = {
  id: number;
  point: number;
  text: string;
  createdAt: any;
  questionId: number;
};

interface RadioOptionsProps {
  options: TOptions[];
  onOptionSelect: (id: number) => void;
}

const RadioOptions = ({ options, onOptionSelect }: RadioOptionsProps) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex z-10 flex-col gap-4 w-full">
      {options.map((option: any, index: any) => (
        <div
          key={index}
          onClick={() => setSelected(option.id)}
          className={clsx(
            selected === option?.id && "bg-[#e5e4eb]",
            "flex flex-row bg-white gap-2 py-3 items-center border-[0.5px] w-full rounded-md px-3"
          )}
        >
          <input
            type="radio"
            id={`option${option.id}`}
            name="options"
            value={option?.id}
            onChange={() => onOptionSelect(option.id)}
            className="bg-white border rounded-full w-3.5 h-3 border-gray-400 checked:bg-[#7C56FE] checked:border-gray-900 focus:outline-2px solid green-500"
          />
          <label
            className={clsx(
              selected === option?.id && "text-[#7C56FE]",
              "w-full"
            )}
            htmlFor={`option${option.id}`}
          >
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioOptions;
