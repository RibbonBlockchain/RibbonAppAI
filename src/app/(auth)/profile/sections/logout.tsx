"use client";

import { useLogout } from "@/api/auth";
import { LogoutCurve } from "iconsax-react";
import { SpinnerIcon } from "@/components/icons/spinner";

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
      <LogoutCurve size="32" color="red" variant="Outline" /> <p>Log Out</p>
    </div>
  );
};

export default Logout;
