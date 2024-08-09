"use client";

import {
  Home,
  Global,
  Activity,
  ShoppingCart,
  ProfileCircle,
} from "iconsax-react";
import clsx from "clsx";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const items = [
  {
    route: "/dashboard",
    name: "Home",
    icon: <Home size="32" color="#ffffff" variant="Bold" />,
  },
  {
    route: "/store",
    name: "Store",
    icon: <ShoppingCart size="32" color="#ffffff" variant="Bold" />,
  },
  {
    route: "/linkages",
    name: "Linkages",
    icon: <Global size="32" color="#ffffff" variant="Bold" />,
  },
  {
    route: "/activity",
    name: "Activity",
    icon: <Activity size="32" color="#ffffff" variant="Bold" />,
  },
  {
    route: "/profile",
    name: "Profile",
    icon: <ProfileCircle size="32" color="#ffffff" variant="Bold" />,
  },
];

const FooterNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 w-[100%] max-w-[400px] mx-auto self-center z-50 h-auto text-xs font-extrabold text-white rounded-full bg-[#3f3952] bg-opacity-75 backdrop-blur-sm">
      <div className="flex items-center justify-around py-2">
        {items.map(({ route, name, icon }) => (
          <a
            key={name}
            onClick={() => {
              router.push(route);
            }}
            className={clsx(
              `flex flex-row gap-2 py-3 px-2 sm:px-4 rounded-full items-center justify-center`,
              pathname.includes(route) && "text-white"
            )}
          >
            {pathname.includes(route) ? icon : icon}
            {pathname.includes(route) ? <>{name}</> : <></>}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterNav;
