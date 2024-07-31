import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import React from "react";

const Profile = () => {
  return (
    <AuthNavLayout>
      <div className="min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6">
        Profile
      </div>
    </AuthNavLayout>
  );
};

export default Profile;
