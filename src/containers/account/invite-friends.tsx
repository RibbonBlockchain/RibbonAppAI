import clsx from "clsx";
import React from "react";
import Image from "next/image";

const InviteFriends = ({ className }: { className: string }) => {
  return (
    <div
      className={clsx(
        "my-2 p-2 flex items-center justify-between rounded-md",
        className
      )}
    >
      <div className="flex flex-row gap-3 items-center justify-center">
        <Image
          priority
          width={52}
          height={54}
          alt="avatar"
          src="/images/group.png"
        />
        <div className="flex flex-col">
          <p className="text-base font-semibold">Invite friends</p>
          <p className="text-xs font-medium text-[#626262]">Earn 5 WLD</p>
        </div>
      </div>
      <Image
        priority
        width={37}
        height={35}
        alt="avatar"
        src="/images/invite.svg"
      />
    </div>
  );
};

export default InviteFriends;
