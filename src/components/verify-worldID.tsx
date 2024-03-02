"use client";

import React from "react";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import Image from "next/image";

const VerifyWorldID = () => {
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (!res.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  const onSuccess = () => {
    console.log("Success");
    window.location.href = "/dashboard";
  };
  return (
    <div>
      <IDKitWidget
        app_id="app_staging_d8aa638fa082a2ddf317a85d2f6d4b67"
        action="icognito-ribbon"
        // false
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => (
          <button
            className="text-white bg-black border-black w-full py-4 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
            onClick={open}
          >
            Verify with World ID
            <Image
              width={24}
              height={24}
              alt="world-coin"
              src="/images/world-coin.svg"
            />
          </button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default VerifyWorldID;
