import React from "react";
import Image from "next/image";
import CoinSVG from "../../../public/images/coin";
import { useGetAuth } from "@/api/auth";

const User = () => {
  const { data: user } = useGetAuth({ enabled: true });

  return (
    <div className="bg-account bg-cover flex flex-row mx-auto mt-4 py-6 items-center justify-between rounded-md">
      <div className="flex flex-col mx-auto items-center justify-center gap-1">
        <div className="relative flex flex-row">
          <Image
            priority
            width={83}
            height={79}
            alt="avatar"
            src={user?.avatar || "/images/avatar.jpg"}
            className="border-2 border-[#A81DA6] rounded-full"
          />
          <Image
            src="/images/camera.svg"
            alt="camera"
            width={24}
            height={24}
            className="absolute bottom-2 -right-1"
          />
        </div>
        <p className="text-lg font-semibold">
          {user?.firstName} {user?.lastName}
        </p>
        <div className="text-gradient flex flex-row gap-2 items-center justify-center text-sm font-bold">
          <CoinSVG fill="#6200EE" />
          25 WLD
        </div>
      </div>
    </div>
  );
};

export default User;
