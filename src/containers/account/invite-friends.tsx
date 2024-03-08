import React from "react";
import Image from "next/image";

const InviteFriends = () => {
  return (
    <div className="bg-[#EAF7ED] my-6 p-2 flex items-center justify-between rounded-md">
      <div className="flex flex-row gap-3 items-center justify-center">
        <Image
          priority
          width={52}
          height={54}
          alt="avatar"
          src="/images/group.svg"
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
