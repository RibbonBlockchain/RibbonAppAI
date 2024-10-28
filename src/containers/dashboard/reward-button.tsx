import Image from "next/image";
import { useClaimDailyRewards } from "@/api/user";
import React, { useState, useEffect } from "react";
import SuccessAnimation from "@/components/success-animation";

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
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { mutate } = useClaimDailyRewards({
    onSuccess: () => setShowSuccess(true),
  });

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

    mutate();

    const cooldownTime = 12 * 60 * 60 * 1000;
    const endTime = Date.now() + cooldownTime;
    localStorage.setItem("rewardCooldown", endTime.toString());

    setIsDisabled(true);
    setCountdown(cooldownTime / 1000);
  };

  return (
    <div className="w-full">
      {isDisabled ? (
        <div className="w-full flex flex-row items-center text-center justify-center">
          {formatTime(countdown)}
        </div>
      ) : (
        <Image
          src={"/assets/daily-reward.svg"}
          alt=""
          width={150}
          height={88}
          className="w-full"
          onClick={claimReward}
        />
      )}
      {showSuccess && <SuccessAnimation />}
    </div>
  );
};

export default RewardButton;
