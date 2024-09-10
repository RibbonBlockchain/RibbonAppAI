import clsx from "clsx";
import React from "react";
import Image from "next/image";

const InviteFriends = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "my-2 p-2 text-black flex items-center justify-between rounded-[18px] border border-[#D6CBFF33]",
        className
      )}
    >
      <div className="flex flex-row gap-4 py-3 px-3 items-center justify-center">
        <Image
          priority
          width={52}
          height={54}
          alt="avatar"
          src="/assets/group-pc.png"
        />

        <div className="flex flex-col">
          <p className="text-base font-bold">Invite friends</p>

          <div className="flex flex-row items-center">
            <Image
              alt="coin"
              width={32}
              height={32}
              src="/assets/coin.png"
              className="w-[32px] h-[32px] -ml-2"
            />
            <p className="text-sm font-normal">10000 ribbon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
