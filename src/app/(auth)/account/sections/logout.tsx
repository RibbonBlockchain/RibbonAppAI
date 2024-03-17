"use client";

import { useLogout } from "@/api/auth";
import PageLoader from "@/components/loader";
import { LogOut } from "../../../../../public/images";

const Logout = () => {
  const { mutate: logout, isPending, isSuccess } = useLogout();

  const isLoading = isPending || isSuccess;

  const handleLogout = () => {
    if (isLoading) return;
    logout();
  };

  if (isLoading) return <PageLoader />;

  return (
    <div
      onClick={handleLogout}
      className="flex flex-row items-center justify-center my-10 gap-2 text-base text-[#FF170A]"
    >
      <LogOut />
      <p>Log Out</p>
    </div>
  );
};

export default Logout;
