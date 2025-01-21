"use client";

import { useCreateSavingsPlan } from "@/api/user";
import { SpinnerIconPurple } from "@/components/icons/spinner";
import InputBox from "@/components/questionnarie/input-box";
import { moneyClubSavingsPlan, savingsFrequency } from "@/lib/values/prompts";
import clsx from "clsx";
import { ArrowLeft2, Calendar } from "iconsax-react";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSavingsPlan = () => {
  const router = useRouter();

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenInfoModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [contribution, setContribution] = useState(0);
  const [duration, setDuration] = useState("");
  const [participants, setParticipants] = useState(0);

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [planCategory, setPlanCategory] = useState("");
  const handleSelectPlan = (id: string, label: string) => {
    setSelectedPlanId(id);
    setPlanCategory(label);
  };

  const [selectedFrequencyId, setSelectedFrequencyId] = useState<string>("");
  const [frequencyCategory, setFrequecnyCategory] = useState("");
  const handleSelectFrequency = (id: string, label: string) => {
    setSelectedFrequencyId(id);
    setFrequecnyCategory(label);
  };

  const [selectedPayoutNumber, setSelectedPayoutNumber] = useState(0);
  const handleClick = (number: any) => {
    setSelectedPayoutNumber(number);
  };

  const numbers = [...Array(20)].map((_, index) => (
    <p
      key={index}
      className={`border border-[#FFFFFF36] flex items-center justify-center text-center w-[40px] h-[40px] rounded-lg cursor-pointer ${
        selectedPayoutNumber === index + 1 ? "bg-blue-500 text-white" : ""
      }`}
      onClick={() => handleClick(index + 1)}
    >
      {index + 1}
    </p>
  ));

  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const { mutate, isPending } = useCreateSavingsPlan();

  const isSubmitDisabled = false;
  const handleCreateSavingsPlan = () => {
    const body = {
      type: selectedPlanId,
      about: description,
      name: name,
      targetAmount: amount,
      individualAmount: contribution,
      frequency: selectedFrequencyId,
      duration: duration,
      participant: participants,
      payoutDate: startDate,
      payoutNumber: selectedPayoutNumber,
    };
    console.log(body, "body");

    mutate(body, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 pb-20">
      <div className="flex flex-row gap-2 items-center mt-3">
        <ArrowLeft2 onClick={() => router.back()} className="" />
        <p className="text-xl font-bold">Create a savings plan</p>
      </div>

      <section className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-1">
          <div
            ref={modalRef}
            className="relative flex flex-row items-center gap-2 text-sm"
          >
            <p className="font-bold"> Savings type</p>
            <Info onClick={() => setOpenInfoModal(!openInfoModal)} size={16} />
            {openInfoModal && (
              <div className="absolute top-6 p-3 flex flex-col gap-3 text-white bg-[#3e3854] rounded-lg w-[90%]">
                <p className="font-bold">Fixed Savings</p>

                <p>
                  A one-time savings plan with a fixed target amount and
                  deadline. Funds remain locked until the specified deadline,
                  making it ideal for achieving long-term goals, like a trip or
                  major purchase.
                </p>

                <p className="font-bold">Flexible Savings</p>

                <p>
                  A flexible savings plan where participants contribute
                  regularly (weekly, biweekly, or monthly). Funds are
                  distributed to individuals in a rotating manner based on their
                  assigned order, making it suitable for group savings with
                  payouts on selected dates.
                </p>
              </div>
            )}
          </div>

          <div className="">
            {moneyClubSavingsPlan.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelectPlan(option.id, option.label)}
                className="flex items-center cursor-pointer py-1 text-base font-normal"
              >
                <span className="flex-grow">{option.label}</span>
                <div
                  className={`w-4 h-4 rounded-full border-2 ml-2 ${
                    selectedPlanId === option.id
                      ? "bg-white border-white"
                      : "border-white"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-bold">About savings</label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write few details about this savings plan..."
            className="w-full appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB86] text-sm text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <InputBox
          name={"name"}
          label={"Savings name"}
          placeholder="Savings plan name"
          required={false}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputBox
          name={"target-amount"}
          label={"Target amount"}
          placeholder="0.00 USDC"
          required={false}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <InputBox
          name={"contribution-amount"}
          label={"Individual Contribution Amount"}
          placeholder="0.00 USDC"
          required={false}
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Savings frequency</label>

          <div className="">
            {savingsFrequency.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelectFrequency(option.id, option.label)}
                className="flex items-center cursor-pointer py-1 text-base font-normal"
              >
                <span className="flex-grow">{option.label}</span>
                <div
                  className={`w-4 h-4 rounded-full border-2 ml-2 ${
                    selectedFrequencyId === option.id
                      ? "bg-white border-white"
                      : "border-white"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <InputBox
          name={"duration"}
          label={"Duration"}
          placeholder="e.g 5 months"
          required={false}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <InputBox
          name={"participants"}
          label={"Number of participants"}
          placeholder="e.g 20"
          required={false}
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />

        {selectedPlanId === "flexible" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Payout priority number</label>

            <p className="text-xs font-medium">
              Our payout priority determines when you’ll receive funds. Lower
              numbers get paid earlier
            </p>

            <div className="flex flex-wrap gap-2 mt-2">{numbers}</div>
          </div>
        )}

        {selectedPlanId === "flexible" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Payout start date</label>

            <div className="flex flex-row items-center justify-between">
              <label className="text-sm font-bold">Set date</label>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="p-2 border rounded-md bg-inherit"
              />
            </div>
          </div>
        )}

        <button
          disabled={isSubmitDisabled}
          onClick={handleCreateSavingsPlan}
          className={clsx(
            "mt-6 w-full rounded-[8px] py-3 font-bold text-sm flex flex-row items-center justify-center",
            isSubmitDisabled
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-white text-[#290064]"
          )}
        >
          {isPending ? <SpinnerIconPurple /> : "Create Savings Plan"}
        </button>
      </section>
    </main>
  );
};

export default CreateSavingsPlan;
