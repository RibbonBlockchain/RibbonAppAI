import React from "react";
import { Chart } from "iconsax-react";
import { Bar, XAxis, YAxis, BarChart } from "recharts";

const barChartData = [
  { name: "21 Aug", uv: 50 },
  { name: "22 Aug", uv: 40 },
  { name: "23 Aug", uv: 25 },
  { name: "24 Aug", uv: 32 },
];

const Activity = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-2 text-lg font-bold py-3 border-b border-[#C3B1FF4D]">
        <Chart size="20" color="#ffffff" />
        Chat Analytics
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-start gap-1 text-xs font-normal">
          <p className="font-normal text-xs">Total Chats</p>
          <p className="flex flex-row items-center gap-1 font-bold text-base">
            0
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 text-xs font-normal">
          <p className="font-normal text-xs">Total Messages</p>
          <p className="flex flex-row items-center gap-1 font-bold text-base">
            0
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 text-xs font-normal">
          <p className="font-normal text-xs">Average rating</p>
          <p className="flex flex-row items-center gap-1 font-bold text-base">
            0
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-2 text-lg font-bold py-3 border-b border-[#C3B1FF4D]">
        Chats by date
        <Chart size="20" color="#ffffff" />
      </div>

      <div className="-ml-[30px] w-[inherit] overflow-x-auto scroll-hidden">
        <BarChart
          width={300}
          height={300}
          data={barChartData}
          barGap="30px"
          barSize={40}
        >
          <XAxis dataKey="name" stroke="#FFFFFF" />
          <YAxis stroke="#FFFFFF" />

          <Bar dataKey="uv" fill="#EFE6FD" barSize={40} className="bg-white" />
        </BarChart>
      </div>
    </div>
  );
};

export default Activity;
