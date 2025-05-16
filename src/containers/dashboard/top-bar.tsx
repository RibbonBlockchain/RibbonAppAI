"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";

const useUnreadNotificationCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem("unreadNotificationCount");
    setCount(savedCount ? parseInt(savedCount, 10) : 0);
  }, []);

  return count;
};

const Topbar = ({ children }: { children: React.ReactNode }) => {
  const unreadCount = useUnreadNotificationCount();

  return (
    <div className="w-full p-4 sm:p-4 flex flex-row items-center justify-between">
      {children}

      <div className="flex flex-row items-center justify-center gap-3">
        <Link href="/dashboard/notifications" className="relative">
          <Bell
            fill="#fff"
            stroke="#fff"
            className="rounded-full p-[2px] ml-2"
          />

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-[10px] font-bold text-white text-center w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
