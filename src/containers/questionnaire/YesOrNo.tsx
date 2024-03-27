import React from "react";
import toast from "react-hot-toast";

const YesOrNo = () => {
  const options = ["😄 Yes", "😢 No"];

  const [selected, setSelected] = React.useState("");

  if (!selected) {
    toast("Please select an option");
  }

  return (
    <div className="flex flex-row gap-10">
      {options.map((text: any, index: any) => (
        <div
          key={index}
          onClick={() => {
            setSelected(text), console.log(text, "selected");
          }}
          className={`bg-white flex mx-auto items-center justify-center border-[0.5px] border-[#7C56FE] shadow-lg w-full py-2 rounded-full px-3 ${
            selected === text && "bg-[#7C56FE]"
          }`}
        >
          <div className="flex flex-row text-nowrap py-1.5 px-2">{text}</div>
        </div>
      ))}
    </div>
  );
};

export default YesOrNo;
