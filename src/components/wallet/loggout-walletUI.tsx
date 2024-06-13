import React from "react";
import { WalletMoney } from "@/public/images";
import BackArrowButton from "../button/back-arrow";

const LoggoutWalletUI = ({ login }: { login: any }) => {
  return (
    <div className="flex flex-col p-4 sm:p-6 h-screen bg-cover bg-walletBg">
      <div className="mb-6">
        <BackArrowButton stroke="#FFF" />
        <div className="flex -mt-10 text-white  flex-row items-center justify-center text-base font-semibold">
          Wallet
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-evenly text-white">
        <div className="w-[212px] h-[232px]"></div>
        <div className="flex flex-col items-center justify-center text-center gap-10">
          <div className="flex flex-col gap-1.5">
            <p className="text-3xl font-bold">
              Manage Your Crypto Assets Easily
            </p>
            <p className="text-sm">
              Monitor and manage crypto portfolio with Ribbon Protocol
            </p>
          </div>
          <button
            onClick={login}
            className="flex flex-row gap-3 items-center justify-center px-6 py-2 w-fit bg-white text-[#7C56FE] font-medium rounded-md hover:bg-[#c0b7df] mr-2 mt-4"
          >
            Connect wallet <WalletMoney />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggoutWalletUI;
