"use client";

import clsx from "clsx";
import { useGetAuth } from "@/api/auth";
import CoinSVG from "@/public/images/coin";
import React, { useEffect, useState } from "react";

const CountdownTimer: React.FC = () => {
  const [countdownTime, setCountdownTime] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const { data: user } = useGetAuth({ enabled: true });

  useEffect(() => {
    const fetchCountdownTime = async () => {
      const clickedTime = new Date(user?.lastClaimTime);

      const twelveHoursLater = new Date(
        clickedTime.getTime() + 12 * 60 * 60 * 1000
      );
      setCountdownTime(twelveHoursLater);
    };

    fetchCountdownTime();
  }, []);

  useEffect(() => {
    if (!countdownTime) return;

    const interval = setInterval(() => {
      const currentTime = new Date();
      const remaining = Math.max(
        Math.floor((countdownTime.getTime() - currentTime.getTime()) / 1000),
        0
      );
      setRemainingTime(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTime]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const restartCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setCountdownTime(null);
    setRemainingTime(0);
  };

  return (
    <div className="w-auto">
      {remainingTime > 0 ? (
        <p className="w-[80px]">{formatTime(remainingTime)}</p>
      ) : (
        <div
          className={clsx(
            "text-gradient flex flex-row gap-2 items-center justify-center text-[20px] font-bold"
          )}
        >
          <CoinSVG fill="#4B199C" />5 WLD
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
