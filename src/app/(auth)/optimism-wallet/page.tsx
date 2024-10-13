import React from "react";
import WalletComponent from "@/containers/wallet";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Wallet = () => {
  return (
    <AuthNavLayout>
      <div className="relative min-h-screen w-full text-white bg-[#0B0228] pb-24">
        <WalletComponent />
      </div>
    </AuthNavLayout>
  );
};

export default Wallet;
