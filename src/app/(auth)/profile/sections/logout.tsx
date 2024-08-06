"use client";

import { useLogout } from "@/api/auth";
import PageLoader from "@/components/loader";
// import { LogOut } from "../../../../../public/images";
import { SpinnerIcon } from "@/components/icons/spinner";
import { LogOut } from "lucide-react";

const Logout = () => {
  const { mutate: logout, isPending, isSuccess } = useLogout();

  const isLoading = isPending || isSuccess;

  const handleLogout = () => {
    if (isLoading) return;
    logout();
  };

  if (isLoading) return <SpinnerIcon />;

  return (
    <div
      onClick={handleLogout}
      className="cursor-pointer flex flex-row items-center justify-center my-10 gap-2 text-base text-[#FF170A]"
    >
      <LogOut />
      <p>Log Out</p>
    </div>
  );
};

export default Logout;
