import React from "react";
import FooterNav from "./nav";

const AuthNavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col">
      <div className="flex-1 text-white">{children}</div>
      <FooterNav />
    </div>
  );
};

export default AuthNavLayout;
