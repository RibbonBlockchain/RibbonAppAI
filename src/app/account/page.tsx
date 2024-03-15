import Menu, {
  Support,
  Settings,
  ProfileDetails,
} from "../../containers/account/menu";
import React from "react";
import User from "@/containers/account/user";
import { LogOut } from "../../../public/images";
import { ChevronRight, Sun } from "lucide-react";
import InviteFriends from "@/containers/account/invite-friends";

const Account = () => {
  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <h1 className="text-2xl font-extrabold mt-3">My Account</h1>
      <User />

      <InviteFriends />

      <div className="mt-2 flex flex-col gap-[2px]">
        <p className="text-xs font-bold text-[#434343]">ACCOUNT</p>
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
        <p className="text-xs font-bold pt-6 pb-2 text-[#434343]">
          SETTINGS & SECURITY
        </p>
        {Settings.map(({ href, description, logo }) => (
          <Menu
            href={href}
            logo={logo}
            key={description}
            description={description}
          />
        ))}
        <div>
          <div className="flex flex-row items-center justify-between py-3 px-[6px] ">
            <div className="flex flex-row items-center justify-center gap-3">
              <Sun />
              <p className="text-base font-medium">Dark Mode</p>
            </div>
            <ChevronRight stroke="#6200EE" />
          </div>
          <hr />
        </div>
      </div>

      <div className="flex flex-col gap-[2px]">
        <p className="text-xs font-bold pt-6 pb-2 text-[#434343] ">SUPPORT</p>
        {Support.map(({ href, description, logo }) => (
          <Menu
            href={href}
            logo={logo}
            key={description}
            description={description}
          />
        ))}
      </div>

      <div className="flex flex-row items-center justify-center my-10 gap-2 text-base text-[#FF170A]">
        <LogOut />
        <p>Log Out</p>
      </div>
    </div>
  );
};

export default Account;
