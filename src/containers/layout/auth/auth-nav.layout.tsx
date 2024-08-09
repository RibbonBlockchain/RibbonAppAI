"use client";

import React from "react";
import FooterNav from "./nav";
import { usePathname } from "next/navigation";
import FloatingIcon from "@/app/(auth)/dashboard/floating-icon";

const AuthNavLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const shouldHideFooterNav = pathname.includes("/bot");

  return (
    <div className="relative flex flex-col h-screen mx-auto">
      <div className="flex-1 text-white">{children}</div>
      <FloatingIcon />
      {!shouldHideFooterNav && <FooterNav />}
    </div>
  );
};

export default AuthNavLayout;
