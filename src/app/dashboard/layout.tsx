import React from "react";
import FooterNav from "@/containers/dashboard/footer-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 mb-[70px]">{children}</main>
      <FooterNav />
    </div>
  );
};

export default DashboardLayout;
