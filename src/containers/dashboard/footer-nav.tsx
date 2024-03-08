"use client";

import clsx from "clsx";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { CircleUser, History, Home } from "lucide-react";

const items = [
  {
    route: "/dashboard",
    name: "Home",
    icon: <Home />,
    iconFilled: <Home fill="#B6B6B6" />,
  },
  {
    route: "/activity",
    name: "Activity",
    icon: <History />,
    iconFilled: <History fill="#B6B6B6" />,
  },
  {
    route: "/account",
    name: "Account",
    icon: <CircleUser />,
    iconFilled: <CircleUser fill="#B6B6B6" />,
  },
];

const FooterNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full z-50 max-w-[500px] h-auto text-xs font-extrabold text-white rounded-t-[24px] bg-[#FDFDFD] bg-opacity-95">
      <div className="flex items-center justify-around p-4 sm:p-6 sm:py-5">
        {items.map(({ route, name, icon, iconFilled }) => (
          <a
            key={name}
            href="#"
            onClick={() => {
              router.push(route);
            }}
            className={clsx(
              `flex flex-row gap-3 py-3 px-3 sm:px-5 rounded-full items-center justify-center`,
              pathname.includes(route) && "bg-[#6200EE]"
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
