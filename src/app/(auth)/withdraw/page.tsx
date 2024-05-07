import React from "react";
import Link from "next/link";
import { BankWithdrawal, Paypal, WorldID } from "@/public/images";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import BackArrowButton from "@/components/button/back-arrow";
import Network from "@/public/ReactSVG/network";

const withdrwalMethods = [
  {
    name: "wallet-address",
    logo: <WorldID />,
    text: "Wallet Address",
    link: "/withdraw/wallet-address",
    available: true,
  },
  {
    name: "paypal",
    logo: <Paypal />,
    text: "PayPal",
    link: "#",
    available: false,
  },
  {
    name: "bank",
    logo: <BankWithdrawal />,
    text: "Bank Transfer",
    link: "#",
    available: false,
  },
];

const withdrawalHistory = [
  {
    method: "WLD",
    amount: 5,
    amount_in_dollars: 25.0,
  },
  {
    method: "PayPal",
    amount: 5,
    amount_in_dollars: 25.0,
  },
];

const NoWithdrawals = () => {
  return (
    <div className="flex mx-auto items-center justify-center w-full min-h-[40vh] ">
      No withdrawals
    </div>
  );
};

const WithdrawalHistory = () => {
  return (
    <div>
      <p>Today</p>
      <div className="flex flex-col gap-5 mt-3">
        {withdrawalHistory?.map((i: any) => (
          <div key={i.method} className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between ">
              <p>{i.method} withdrawal successful</p>
              <p>{i.amount} WLD</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-[#626262]">Using {i.method} wallet</p>
              <p className="text-[#7C56FE]">$ {i.amount_in_dollars}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Withdraw = () => {
  const withdrawals = [{}];

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-10">
      <div className="">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10 flex-row items-center justify-center text-lg font-medium">
          Withdraw tokens
        </div>
      </div>

      <div>
        <p className="text-base font-bold">Choose a withdrawal method</p>
        <p className="text-sm text-[#434343] mt-1">
          Secure transactions every time
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {withdrwalMethods?.map((i: any) => (
          <Link
            href={i.link}
            key={i.name}
            className="flex flex-row items-center justify-between py-3.5 px-2 border-[1px] border-[#F2EEFF] rounded-md"
          >
            <div className="flex flex-row gap-3">
              {i.logo}
              <p>{i.text}</p>
            </div>

            <div className="flex gap-5">
              {!i.available && (
                <p className="bg-[#F7B13C] text-[10px] px-2 py-1 my-auto text-center rounded-full">
                  Coming soon
                </p>
              )}

              <ArrowRightIcon width={20} height={20} fill="#7C56FE" />
            </div>
          </Link>
        ))}
      </div>

      <div>
        <p className="text-base font-bold">History</p>
        <div className="mt-2">
          {withdrawals?.length >= 1 ? (
            <div className="h-auto flex flex-col my-5">
              <WithdrawalHistory />
            </div>
          ) : (
            <NoWithdrawals />
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
