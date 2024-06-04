import clsx from "clsx";
import React, { useState, useEffect } from "react";

type TOptions = {
  id: number;
  point: number;
  text: string;
  createdAt: any;
  questionId: number;
};

interface RadioOptionsProps {
  options: TOptions[];
  selectedOptions: number[];
  onOptionSelect: (ids: number[]) => void;
}

const CheckBoxes = ({
  options,
  onOptionSelect,
  selectedOptions,
}: RadioOptionsProps) => {
  const [selected, setSelected] = useState<number[]>(selectedOptions);

  useEffect(() => {
    setSelected(selectedOptions);
  }, []);

  const handleOptionToggle = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  useEffect(() => {
    onOptionSelect(selected);
  }, [selected, onOptionSelect]);

  return (
    <div className="flex z-10 flex-col gap-4 w-full">
      {options.map((option: any, index: any) => (
        <div
          key={index}
          onClick={() => handleOptionToggle(option.id)}
          className={clsx(
            selected.includes(option.id) ? "bg-slate-100" : "bg-white",
            "flex flex-row gap-2 py-3 items-center border-[0.5px] w-full rounded-md px-3"
          )}
        >
          <input
            type="checkbox"
            id={`option${option.id}`}
            name={`option${option.id}`}
            checked={selected.includes(option.id)}
            onChange={() => {
              handleOptionToggle(option.id);
            }}
            className="bg-white border rounded-full w-3.5 h-3 "
          />

          <label
            className={clsx(
              selected.includes(option.id) ? "text-[#7C56FE]" : "",
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

export default CheckBoxes;
