import React from "react";

interface RadioSelectProps {
  options: string[];
  thirdOptionText?: string;
}

const RadioSelect = ({ options, thirdOptionText }: RadioSelectProps) => {
  const [selected, setSelected] = React.useState("");

  const handleOptionChange = (e: any) => {
    setSelected(e.target.value);
  };

  console.log(selected, "option selected");

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 border-md">
      {options.map((text, index) => (
        <div
          key={index}
          className={`bg-white border-[0.5px] shadow-lg w-full py-2 rounded-md px-3 ${
            selected === text && "bg-[#F2EEFF]"
          }`}
        >
          <input
            type="radio"
            id={`option${index}`}
            name="options"
            value={text}
            checked={selected === text}
            onChange={handleOptionChange}
          />
          <label htmlFor={`option${index}`} className="text-sm ml-3">
            {text}
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
