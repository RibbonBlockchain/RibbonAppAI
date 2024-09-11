import Image from "next/image";
import MoodModal from "./mood-modal";
import { useClaimDailyRewards } from "@/api/user";
import React, { useState, useEffect } from "react";

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
    2,
    "0"
  )} : ${String(secs).padStart(2, "0")}`;
};

const RewardButton: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  const [moodModal, setMoodModal] = useState(false);

  const { mutate } = useClaimDailyRewards();

  useEffect(() => {
    const storedTime = localStorage.getItem("rewardCooldown");
    if (storedTime) {
      const endTime = parseInt(storedTime, 10);
      const remainingTime = endTime - Date.now();
      if (remainingTime > 0) {
        setIsDisabled(true);
        setCountdown(Math.ceil(remainingTime / 1000));
      } else {
        localStorage.removeItem("rewardCooldown");
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isDisabled && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setIsDisabled(false);
            localStorage.removeItem("rewardCooldown");
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDisabled, countdown]);

  const claimReward = () => {
    if (isDisabled) return;

    setMoodModal(true);
    // mutate();

    const cooldownTime = 12 * 60 * 60 * 1000;
    const endTime = Date.now() + cooldownTime;
    localStorage.setItem("rewardCooldown", endTime.toString());

    setIsDisabled(true);
    setCountdown(cooldownTime / 1000);
  };

  return (
    <div className="my-6 w-full gap-1 xxs:gap-2 max-w-[350px] mx-auto flex flex-row items-center justify-between text-xs font-semibold py-1.5 px-3 text-white bg-[#3f3952] border-[#4B199C] border-[2px] rounded-full h-[40px]">
      {isDisabled ? (
        <div className="w-full flex flex-row items-center text-center justify-center">
          {formatTime(countdown)}
        </div>
      ) : (
        <div
          onClick={claimReward}
          className="flex flex-row items-center justify-center w-full gap-4"
        >
          <p>Claim daily reward</p>
          <div className="flex flex-row items-center">
            <Image
              src="/assets/coin.png"
              alt="coin"
              height={32}
              width={32}
              className="w-[32px] h-[32px]"
            />
            <p>5000 ribbon</p>
          </div>
        </div>
      )}

      {moodModal && (
        <MoodModal isOpen={moodModal} onClose={() => setMoodModal(false)} />
      )}
    </div>
  );
};

export default RewardButton;
