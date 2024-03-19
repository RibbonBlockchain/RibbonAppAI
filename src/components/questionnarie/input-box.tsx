import React from "react";

const InputBox = ({
  label,
  value,
  required,
  onChange,
}: {
  value: any;
  label: string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div key={label} className="mb-4 text-[#080808]">
      <label
        htmlFor="input"
        className={`${
          required ? "after:content-['*']" : ""
        }  block after:ml-1 text-xs mb-2`}
      >
        {label}
      </label>
      <input
        id="input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Ribbon Protocol"
        className="text-xs w-full py-3.5 px-2 leading-tight shadow appearance-none border rounded  focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default InputBox;
