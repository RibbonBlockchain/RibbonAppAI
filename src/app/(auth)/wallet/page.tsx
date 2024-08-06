import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import React from "react";
import FloatingIcon from "../dashboard/floating-icon";

const Wallet = () => {
  return (
    <AuthNavLayout>
      <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
        Wallet
        <FloatingIcon />
      </div>
    </AuthNavLayout>
  );
};

export default Wallet;
