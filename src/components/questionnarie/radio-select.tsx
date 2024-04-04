import clsx from "clsx";
import React from "react";

interface RadioSelectProps {
  options: string[];
  thirdOptionText?: string;
}

const RadioSelect = ({ options, thirdOptionText }: any) => {
  const [selected, setSelected] = React.useState("");

  const handleOptionChange = (e: any) => {
    setSelected(e.target.value);
  };

  return (
    <div className="w-full z-10 flex flex-col items-center justify-center gap-6 border-md">
      {options.map((value: any, index: any) => (
        <div
          key={index}
          className={clsx(
            "bg-white flex z-10 flex-row items-center py-4 border-[0.5px] shadow-lg w-full rounded-md px-3"
          )}
        >
          <input
            type="radio"
            value={value}
            name="options"
            id={`option${index}`}
            checked={selected === value}
            onChange={handleOptionChange}
          />
          <label
            htmlFor={`option${index}`}
            className={clsx("text-sm ml-3 w-full")}
          >
            {value}
          </label>
        </div>
      ))}
      {thirdOptionText && (
        <div
          className={`bg-white border-[0.5px] shadow-lg w-full py-2 rounded-md px-3 ${
            selected === thirdOptionText && "bg-[#F2EEFF]"
          }`}
        >
          <input
            type="radio"
            id={thirdOptionText}
            name="options"
            value={thirdOptionText}
            checked={selected === thirdOptionText}
            onChange={handleOptionChange}
          />
          <label htmlFor={thirdOptionText} className="text-sm ml-3">
            {thirdOptionText}
          </label>
        </div>
      )}
    </div>
  );
};

export default RadioSelect;
