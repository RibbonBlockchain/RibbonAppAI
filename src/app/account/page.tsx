import React from "react";
import User from "@/containers/account/user";
import InviteFriends from "@/containers/account/invite-friends";
import Menu, { ProfileDetails, Settings } from "../../containers/account/menu";

const Account = () => {
  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <h1 className="text-2xl font-extrabold mt-3">My Account</h1>

      <User />

      <InviteFriends />

      <div className="mt-2 flex flex-col gap-[2px]">
        <p className="text-xs font-bold">ACCOUNT</p>
        {ProfileDetails.map(({ href, description, logo }) => (
          <Menu
            href={href}
            logo={logo}
            key={description}
            description={description}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[2px]">
        <p className="text-xs font-bold pt-6 pb-2">SETTINGS & SECURITY</p>
        {Settings.map(({ href, description, logo }) => (
          <Menu
            href={href}
            logo={logo}
            key={description}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default Account;
