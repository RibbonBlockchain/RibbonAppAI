"use client";

import React from "react";
import Button from "@/components/button";
import { useChangePin } from "@/api/auth";
import BackArrowButton from "@/components/button/back-arrow";
import PinResetSuccessful from "@/components/modal/pin-reset-successful";

const ChangePin = () => {
  const [currentPin, setCurrentPin] = React.useState("");
  const [newPin, setNewPin] = React.useState("");
  const [confirmPin, setConfirmPin] = React.useState("");

  const [successModal, setSuccessModal] = React.useState<boolean>(false);

  const { mutate: changePin, isPending, isSuccess } = useChangePin();

  const isLoading = isPending || isSuccess;
  const isFormInvalid =
    !currentPin || !newPin || !confirmPin || newPin !== confirmPin;

  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = () => {
    setSuccessModal(true);
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    changePin({ currentPin, newPin }, { onSuccess });
  };

  return (
    <div className=" bg-[#F7F5FF] h-[inherit] flex flex-col">
      <div className="p-4 sm:p-6 mb-6">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10  flex-row items-center justify-center text-base font-semibold">
          Change Pin
        </div>
      </div>
      <div className="w-full flex flex-col p-4 sm:p-6 mt-5">
        <label className="text-xs font-bold mb-1 pl-1">Current pin</label>
        <input
          id="currentPin"
          type={"text"}
          name={"currentPin"}
          value={currentPin}
          onChange={(e) => setCurrentPin(e.target.value)}
          placeholder="Current Pin"
          className={
            "text-sm w-full py-4 bg-white px-3 rounded-md leading-tight appearance-none border focus:outline-none focus:border-[#7C56FE] focus:shadow-outline"
          }
        />

        <div className="flex flex-col mt-10">
          <label className="text-xs font-bold mb-1 pl-1">New pin</label>
          <input
            id="newPin"
            type={"text"}
            name={"newPin"}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="Enter new Pin"
            className={
              "text-sm w-full py-4 p-4 sm:p-6 bg-white leading-tight appearance-none border focus:outline-none focus:border-[#7C56FE] focus:shadow-outline"
            }
          />

          <label className="text-xs font-bold mb-1 mt-4 pl-1">
            Confirm pin
          </label>
          <input
            id="confirmPin"
            type={"text"}
            name={"confirmPin"}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            placeholder="Confirm New Pin"
            className={
              "text-sm w-full py-4 p-4 sm:p-6 bg-white leading-tight appearance-none border focus:outline-none focus:border-[#7C56FE] focus:shadow-outline"
            }
          />
        </div>
      </div>

      <div className="flex p-4 sm:p-6 items-center justify-center w-full mt-12">
        <Button
          loading={false}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </div>

      {successModal && <PinResetSuccessful isOpen={successModal} />}
    </div>
  );
};

export default ChangePin;
