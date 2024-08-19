"use client";

import {
  Home,
  Global,
  Activity,
  ShoppingCart,
  ProfileCircle,
  ArrowCircleLeft,
  ArrowCircleRight,
} from "iconsax-react";
import clsx from "clsx";
import React, { useState } from "react";
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

  const [showNav, setShowNav] = useState(true);

  return (
    <>
      <div
        className={clsx(
          "fixed bottom-6 w-[100%] max-w-[400px] mx-auto self-center z-50 h-auto text-xs font-extrabold text-white rounded-full bg-[#3f3952] bg-opacity-75 backdrop-blur-sm",
          showNav ? "nav-enter nav-enter-active" : "nav-exit nav-exit-active"
        )}
      >
        <div className="flex items-center justify-around py-2">
          {items.map(({ route, name, icon }) => (
            <a
              key={name}
              onClick={() => {
                router.push(route);
              }}
              className={clsx(
                `flex flex-row gap-1 py-3 px-1 sm:px-2 rounded-full items-center justify-center`,
                pathname.includes(route) && "text-white"
              )}
            >
              {pathname.includes(route) ? icon : icon}
              {pathname.includes(route) ? <>{name}</> : <></>}
            </a>
          ))}
          <ArrowCircleRight
            onClick={() => setShowNav(false)}
            size="24"
            color="#ffffff"
            className="mr-1"
          />
        </div>
      </div>

      {!showNav && (
        <div
          className={clsx(
            "fixed bottom-6 w-fit h-[72px] flex items-center justify-center self-end z-50 text-xs font-extrabold text-white rounded-full bg-[#3f3952] bg-opacity-75 backdrop-blur-sm"
          )}
        >
          <ArrowCircleLeft
            size="24"
            color="#ffffff"
            className="mx-1"
            onClick={() => setShowNav(true)}
          />
        </div>
      )}
    </>
  );
};

export default FooterNav;
