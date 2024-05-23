"use client";

import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeSwitcher from "@/provider/theme-swicher";
import { RibbonDark, RibbonLight } from "../../../public/images";

const Topbar = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="w-full p-4 sm:p-6 flex flex-row mt-4 py-1 items-start justify-between">
      {currentTheme === "dark" ? <RibbonDark /> : <RibbonLight />}

      <div className="flex flex-row items-center justify-center gap-3">
        <Link href="/dashboard/notifications">
          {currentTheme === "dark" ? (
            <Bell fill="#FFF" stroke="#FFF" className="rounded-full p-[2px]" />
          ) : (
            <Bell
              fill="#6338A2"
              stroke="#6338A2"
              className="rounded-full p-[2px]"
            />
          )}
        </Link>

        <ThemeSwitcher />
        {/* <MoonIcon
          className="w-5 h-5 text-[#6338A2]"
          role="button"
          fill={"#6338A2"}
        /> */}
      </div>
    </div>
  );
};

export default Topbar;
