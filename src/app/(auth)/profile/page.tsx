"use client";

import Menu, {
  Support,
  Settings,
  RouteMenu,
  ProfileDetails,
} from "@/containers/account/menu";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoutCurve, Profile } from "iconsax-react";
import User from "@/containers/account/user";
import { ChevronRight, Scan } from "lucide-react";
import { useGetAuth, useLogout } from "@/api/auth";
import { SpinnerIconPurple } from "@/components/icons/spinner";
import InviteFriends from "@/containers/account/invite-friends";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Account = () => {
  const [theme, setTheme] = React.useState(false);
  const { data: user } = useGetAuth({ enabled: true });

  const { mutate: logout, isPending, isSuccess } = useLogout();

  const isLoading = isPending || isSuccess;

  const handleLogout = () => {
    if (isLoading) return;
    logout();
  };

  if (isLoading)
    return (
      <div className="h-screen flex mx-auto items-center justify-center mt-4">
        <SpinnerIconPurple />
      </div>
    );

  return (
    <AuthNavLayout>
      <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6">
        <div className="mt-3 flex flex-row items-center justify-between">
          <h1 className="text-xl font-extrabold">My Account</h1>
          <div className="flex flex-row items-center">
            <Image
              src="/assets/coin.png"
              alt="coin"
              height={32}
              width={32}
              className="w-[32px] h-[32px]"
            />
            <p className="text-sm font-extrabold">
              {user?.wallet?.balance.toFixed(2)} USDC
            </p>
          </div>
        </div>

        <User />

        <div className="my-4">
          <InviteFriends />
        </div>

        <div className="flex flex-col gap-[2px] mt-8">
          <p className="text-xs font-bold">ACCOUNT</p>

          <Link href="/account/kyc">
            <div className="flex flex-row items-center justify-between py-3 px-[6px] border-b border-[#C3B1FF4D]">
              <div className="flex flex-row items-center justify-center gap-3">
                <Scan />
                <p className="text-base font-medium">
                  Verify Identity (KYC/AML)
                </p>
              </div>

              <ChevronRight stroke="#fff" />
            </div>
          </Link>

          {user?.role === "PATIENT" ? (
            <Link href="/profile/personal-details">
              <div className="flex flex-row items-center justify-between py-3 px-[6px] border-b border-[#C3B1FF4D]">
                <div className="flex flex-row items-center justify-center gap-3">
                  <Profile />
                  <p className="text-base font-medium">Personal Details</p>
                </div>

                <ChevronRight stroke="#fff" />
              </div>
            </Link>
          ) : (
            <Link href="/profile/organization-details">
              <div className="flex flex-row items-center justify-between py-3 px-[6px] border-b border-[#C3B1FF4D]">
                <div className="flex flex-row items-center justify-center gap-3">
                  <Profile />
                  <p className="text-base font-medium">Organization Details</p>
                </div>

                <ChevronRight stroke="#fff" />
              </div>
            </Link>
          )}

          {ProfileDetails.map(({ href, description, logo }) => (
            <Menu
              href={href}
              logo={logo}
              key={description}
              description={description}
            />
          ))}
        </div>

        <div className="flex flex-col gap-[2px] mt-5">
          <p className="text-xs font-bold pt-6 pb-2">SETTINGS & SECURITY</p>
          {Settings.map(({ href, description, logo }) => (
            <Menu
              href={href}
              logo={logo}
              key={description}
              description={description}
            />
          ))}
        </div>

        <div className="flex flex-col gap-[2px] mt-5">
          <p className="text-xs font-bold pt-6 pb-2">SUPPORT</p>
          {Support.map(({ href, description, logo }) => (
            <RouteMenu
              href={href}
              logo={logo}
              key={description}
              description={description}
            />
          ))}
        </div>

        <div className="mb-28">
          <div
            onClick={handleLogout}
            className="cursor-pointer flex flex-row items-center justify-center my-10 gap-2 text-base text-[#FF170A]"
          >
            <LogoutCurve size="32" color="red" variant="Outline" />
            <p>Log Out</p>
          </div>
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default Account;
