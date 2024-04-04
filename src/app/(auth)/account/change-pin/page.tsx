"use client";

import React from "react";
import Button from "@/components/button";
import BackArrowButton from "@/components/button/back-arrow";
import PinResetSuccessful from "@/components/modal/pin-reset-successful";

const ChangePin = () => {
  const [currentPin, setCurrentPin] = React.useState("");
  const [newPin, setNewPin] = React.useState("");
  const [confirmPin, setConfirmPin] = React.useState("");

  const [successModal, setSuccessModal] = React.useState<boolean>(false);

  const handleSubmit = () => {
    setSuccessModal(true);
    console.log("clicked");
  };

  return (
    <div className=" bg-[#F7F5FF] h-[inherit] flex flex-col">
      <div className="p-4 sm:p-6 mb-6">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10  flex-row items-center justify-center text-base font-semibold">
          Change Pin
        </div>
      </div>
      <div className="w-full flex flex-col mt-5 gap-10">
        <input
          id="currentPin"
          type={"text"}
          name={"currentPin"}
          value={currentPin}
          onChange={(e) => setCurrentPin(e.target.value)}
          placeholder="Current Pin"
          className={
            "text-sm w-full py-4 bg-white p-4 sm:p-6 leading-tight appearance-none border-b focus:outline-none focus:border-[#7C56FE] focus:shadow-outline"
          }
        />

        <div className="flex flex-col gap-3">
          <input
            id="currentPin"
            type={"text"}
            name={"currentPin"}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="Enter new Pin"
            className={
              "text-sm w-full py-4 p-4 sm:p-6 bg-white leading-tight appearance-none border-b focus:outline-none focus:border-[#7C56FE] focus:shadow-outline"
            }
          />
          <input
            id="currentPin"
            type={"text"}
            name={"currentPin"}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            placeholder="Confirm New Pin"
            className={
              "text-sm w-full py-4 p-4 sm:p-6 bg-white leading-tight appearance-none border-b focus:outline-none focus:border-[#7C56FE] focus:shadow-outline"
            }
          />
        </div>
      </div>

      <div className="flex p-4 sm:p-6 items-center justify-center w-full mt-12">
        <Button loading={false} onClick={handleSubmit} disabled={false}>
          Submit
        </Button>
      </div>

      {successModal && <PinResetSuccessful isOpen={successModal} />}
    </div>
  );
};

export default ChangePin;
