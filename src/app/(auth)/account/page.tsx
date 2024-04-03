"use client";

import Menu, {
  Support,
  Settings,
  ProfileDetails,
} from "@/containers/account/menu";
import React from "react";
import Link from "next/link";
import { Scan } from "@/public/images";
import Logout from "./sections/logout";
import User from "@/containers/account/user";
import { ChevronRight, Moon, Sun } from "lucide-react";
import SwitchButton from "@/containers/account/switch-button";
import InviteFriends from "@/containers/account/invite-friends";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Account = () => {
  const [theme, setTheme] = React.useState(false);

  return (
    <AuthNavLayout>
      <div className="bg-white min-h-screen p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold mt-3">My Account</h1>
        <User />
        <InviteFriends />

        <div className="mt-2 flex flex-col gap-[2px]">
          <p className="text-xs font-bold text-[#434343]">ACCOUNT</p>

          <Link href="/account/kyc">
            <div className="flex flex-row items-center justify-between py-3 px-[6px] ">
              <div className="flex flex-row items-center justify-center gap-3">
                <Scan />
                <p className="text-base font-medium text-red-500">
                  Verify Identity (KYC/AML)
                </p>
              </div>

              <ChevronRight stroke="#6200EE" />
            </div>
          </Link>

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
            <div
              onClick={() => setTheme(!theme)}
              className="flex flex-row items-center justify-between py-3 px-[6px] "
            >
              {theme ? (
                <div className="flex flex-row items-center justify-center gap-3">
                  <Sun />
                  <p className="text-base font-medium">Dark Mode</p>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center gap-3">
                  <Moon />
                  <p className="text-base font-medium">Light Mode</p>
                </div>
              )}

              <SwitchButton />
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

        <Logout />
      </div>
    </AuthNavLayout>
  );
};

export default Account;
