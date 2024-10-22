import clsx from "clsx";
import React from "react";

const InputBox = ({
  name,
  label,
  value,
  required,
  onChange,
  placeholder,
  className,
  containerClassName,
  onBlur,
}: {
  name: any;
  value: any;
  label: string;
  required: boolean;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  onChange: (e: any) => void;
  onBlur?: () => void;
}) => {
  return (
    <div
      key={label}
      className={clsx(
        "mb-4 text-white",
        containerClassName ? containerClassName : "min-w-full"
      )}
    >
      <label
        htmlFor="input"
        className={`${
          required ? "after:content-['*']" : ""
        }  block after:ml-1 text-sm font-bold mb-2`}
      >
        {label}
      </label>
      <input
        id="input"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Ribbon Protocol"}
        className={clsx(
          "text-xs bg-inherit py-3.5 px-2 leading-tight shadow appearance-none border border-[#D6CBFF79] rounded-[10px] focus:outline-none focus:shadow-outline",
          className ? className : "min-w-full"
        )}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputBox;
