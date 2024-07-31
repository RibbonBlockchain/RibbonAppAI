import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";

const Topbar = () => {
  return (
    <div className="w-full p-4 sm:p-6 flex flex-row mt-4 py-1 items-center justify-between">
      <Image
        src="/assets/ribbon.png"
        alt="coin"
        height={15}
        width={72}
        className="w-[72px] h-[15px]"
      />

      <div className="flex flex-row items-center justify-center gap-3">
        <Link href="/dashboard/notifications">
          <Bell fill="#fff" stroke="#fff" className="rounded-full p-[2px]" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
