import clsx from "clsx";
import React from "react";

export const UserSocialsInputBox = ({
  name,
  label,
  value,
  image,
  required,
  onChange,
}: {
  name: any;
  value: any;
  label: string;
  required: boolean;
  image?: React.ReactNode;
  onChange: (e: any) => void;
}) => {
  return (
    <div key={label} className="mb-4 flex flex-row space-x-2 text-[#080808]">
      <label
        htmlFor="input"
        className={`${
          required ? "after:content-['*']" : ""
        } flex flex-row items-center gap-1.5 after:ml-1 text-xs font-medium min-w-[103px]`}
      >
        {image}
        {label}
      </label>
      <input
        id="input"
        type={"text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Ribbon Protocol"
        className={clsx(
          "text-xs w-full py-3 leading-tight appearance-none border-b focus:outline-none focus:border-[#7C56FE] focus:shadow-outline"
        )}
      />
    </div>
  );
};

const UserDetailsInputBox = ({
  name,
  type,
  label,
  value,
  image,
  required,
  onChange,
}: {
  name: any;
  value: any;
  type?: string;
  label: string;
  required: boolean;
  image?: React.ReactNode;
  onChange: (e: any) => void;
}) => {
  return (
    <div key={label} className="mb-4 text-[#080808]">
      <label
        htmlFor="input"
        className={`${
          required ? "after:content-['*']" : ""
        } flex flex-row items-center gap-1.5 after:ml-1 text-xs font-medium mb-2`}
      >
        {image}
        {label}
      </label>
      <input
        id="input"
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Ribbon Protocol"
        className={clsx(
          "text-xs w-full py-3 leading-tight appearance-none border rounded-md pl-2 focus:outline-none focus:border-[#7C56FE] focus:shadow-outline",
          type === "date" && ""
        )}
      />
    </div>
  );
};

export default UserDetailsInputBox;
