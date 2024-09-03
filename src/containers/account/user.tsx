import React from "react";
import Image from "next/image";
import { useGetAuth } from "@/api/auth";

const User = () => {
  const { data: user } = useGetAuth({ enabled: true });
  const SES_Score = user?.wallet.point;

  // const capitalizeFirstLetter = (str: string) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  return (
    <div className="bg-cover flex flex-row mx-auto mt-4 py-6 items-center justify-between rounded-md">
      <div className="flex flex-row gap-4">
        <div className="relative flex flex-row">
          <Image
            priority
            width={83}
            height={79}
            alt="avatar"
            src={user?.avatar || "/assets/avatar-image.png"}
            className="border-2 border-[#A81DA6] rounded-[28px]"
          />
          <Image
            width={24}
            height={24}
            alt="camera"
            src="/assets/camera.png"
            className="absolute -bottom-2 -right-2"
          />
        </div>

        <div className="flex flex-col items-start justify-between py-2">
          <p className="text-2xl font-bold">
            {user?.firstName} {""}
            {user?.lastName}
          </p>
          <div className="lex flex-row gap-2 items-center justify-center text-base font-bold">
            SES Score: {SES_Score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
