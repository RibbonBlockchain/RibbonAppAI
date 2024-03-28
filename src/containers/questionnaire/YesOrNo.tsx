import React from "react";

const YesOrNo = ({
  options,
}: {
  options: { id: string; text: string; icon: React.ReactNode }[];
}) => {
  const [selected, setSelected] = React.useState("");

  return (
    <div className="flex flex-row gap-12">
      {options.map((i: any) => (
        <div
          key={i.id}
          onClick={() => {
            setSelected(i.text), console.log(i.text, "<<<<selected");
          }}
          className={`bg-white flex mx-auto items-center justify-center border-[0.5px] border-[#7C56FE] shadow-lg w-full py-2 rounded-full px-3 ${
            selected === i.text && "bg-[#5035a7] hover:bg-[#6f4be6]"
          }`}
        >
          {i.icon}
          <div className="flex flex-row text-nowrap py-1.5 px-2">{i.text}</div>
        </div>
      ))}
    </div>
  );
};

export default YesOrNo;
