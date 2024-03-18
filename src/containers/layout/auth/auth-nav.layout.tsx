import React from "react";
import FooterNav from "./nav";

const AuthNavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 mb-[70px]">{children}</div>
      <FooterNav />
    </div>
  );
};

export default AuthNavLayout;
