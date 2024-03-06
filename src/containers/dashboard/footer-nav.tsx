"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CircleUser, History, Home } from "lucide-react";
import clsx from "clsx";

const items = [
  {
    href: "/dashboard",
    text: "Home",
    value: "home",
    icon: <Home />,
    iconFilled: <Home fill="#B6B6B6" />,
  },
  {
    href: "/dashboard/activity",
    text: "Activity",
    value: "activity",
    icon: <History />,
    iconFilled: <History fill="#B6B6B6" />,
  },
  {
    href: "/dashboard/account",
    text: "Account",
    value: "account",
    icon: <CircleUser />,
    iconFilled: <CircleUser fill="#B6B6B6" />,
  },
];

const FooterNav = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = React.useState("home");

  return (
    <div className="fixed bottom-0 w-full z-50 max-w-[500px] bg-white h-auto text-xs font-extrabold text-white">
      <div className="flex items-center justify-around p-4 sm:p-6 sm:py-5">
        {items.map((i) => (
          <a
            key={i.value}
            href="#"
            onClick={() => {
              router.push(i.href), setActiveItem(i.value);
            }}
            className={clsx(
              `flex flex-row gap-3 py-3 px-3 sm:px-5 rounded-full items-center justify-center`,
              activeItem === i.value &&
                "bg-gradient-to-b from-[#334272] to-[#871785]"
            )}
          >
            {activeItem === i.value ? i.icon : i.iconFilled}
            {activeItem === i.value ? <>{i.text}</> : <></>}
          </a>
        ))}

        {/* <a
          href="#"
          onClick={() => {
            router.push("/dashboard"), setActiveItem("home");
          }}
          className={`flex flex-row gap-3 py-3 px-3 sm:px-5 rounded-full items-center justify-center  ${
            activeItem === "home"
              ? "bg-gradient-to-b from-[#334272] to-[#871785]"
              : ""
          }
          `}
        >
          {activeItem === "home" ? <Home /> : <Home fill="#D9D9D9" />}
          {activeItem === "home" ? <>Home</> : <></>}
        </a>
        <a
          href="#"
          onClick={() => {
            router.push("/dashboard/activity"), setActiveItem("activity");
          }}
          className={`flex flex-row gap-3 py-3 px-3 sm:px-5 rounded-full items-center justify-center ${
            activeItem === "activity"
              ? "bg-gradient-to-b from-[#334272] to-[#871785]"
              : ""
          }
         `}
        >
          {activeItem === "home" ? <History /> : <History fill="#D9D9D9" />}
          {activeItem === "activity" ? <>Activity</> : <></>}
        </a>
        <a
          href="#"
          onClick={() => {
            router.push("/dashboard/account"), setActiveItem("account");
          }}
          className={`flex flex-row gap-3 py-3 px-3 sm:px-5 rounded-full items-center justify-center ${
            activeItem === "account"
              ? "bg-gradient-to-b from-[#334272] to-[#871785]"
              : ""
          }
          `}
        >
          {activeItem === "account" ? (
            <CircleUser />
          ) : (
            <CircleUser fill="#D9D9D9" />
          )}
          {activeItem === "account" ? <>Account</> : <></>}
        </a> */}
      </div>
    </div>
  );
};

export default FooterNav;
