"use client";

import clsx from "clsx";
import React from "react";
import HomeSVG from "@/public/ReactSVG/home";
import HistorySVG from "@/public/ReactSVG/history";
import { usePathname, useRouter } from "next/navigation";
import UserProfileSVG from "@/public/ReactSVG/user-circle";

const items = [
  {
    route: "/dashboard",
    name: "Home",
    icon: <HomeSVG fill="white" />,
    iconFilled: <HomeSVG fill="#B6B6B6" />,
  },
  {
    route: "/activity",
    name: "Activity",
    icon: <HistorySVG fill="white" />,
    iconFilled: <HistorySVG fill="#B6B6B6" />,
  },
  {
    route: "/account",
    name: "Account",
    icon: <UserProfileSVG fill="white" />,
    iconFilled: <UserProfileSVG fill="#B6B6B6" />,
  },
];

const FooterNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full z-50 max-w-[500px] h-auto text-xs font-extrabold text-white  rounded-t-[24px] bg-[#FDFDFD] dark:bg-[#171717] bg-opacity-95">
      <div className="flex items-center justify-around p-4 sm:p-6 sm:py-5">
        {items.map(({ route, name, icon, iconFilled }) => (
          <a
            key={name}
            onClick={() => {
              router.push(route);
            }}
            className={clsx(
              `flex flex-row gap-3 py-3 px-3 sm:px-5 rounded-full items-center justify-center`,
              pathname.includes(route) &&
                "bg-gradient-to-b from-[#B538A1] to-[#4A06AB]"
            )}
          >
            {pathname.includes(route) ? icon : iconFilled}
            {pathname.includes(route) ? <>{name}</> : <></>}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterNav;
