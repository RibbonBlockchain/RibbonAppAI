import { apiRequest } from "@/api/query-client";
import { useState, useEffect, useRef } from "react";
import {
  TIMER_DECREMENT_AMOUNT,
  API_ENDPOINTS,
  TIMER_UPDATE_INTERVAL,
} from "./values/constants";

export function useContentTimer(contentId: number, initialTime: number = 15) {
  const [remainingTime, setRemainingTime] = useState<number>(initialTime);
  const [timerWidth, setTimerWidth] = useState<number>(100);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear the timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start or reset the timer
  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset state
    setRemainingTime(initialTime);
    setTimerWidth(100);
    setIsExpired(false);

    // Start new interval
    timerRef.current = setInterval(async () => {
      setRemainingTime((prev) => {
        const newTime = Math.max(0, prev - TIMER_DECREMENT_AMOUNT);

        // Update width based on remaining time
        const newWidth = (newTime / initialTime) * 100;
        setTimerWidth(newWidth);

        // Check if timer has expired
        if (newTime <= 0 && !isExpired) {
          setIsExpired(true);

          // Clear the interval
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        }

        // Update the server with the decremented time
        apiRequest("PATCH", API_ENDPOINTS.TIMER(contentId), {
          seconds: TIMER_DECREMENT_AMOUNT,
        }).catch((error) => {
          console.error("Failed to update timer:", error);
        });

        return newTime;
      });
    }, TIMER_UPDATE_INTERVAL);
  };

  // Reset the timer (called when user interacts with content)
  const resetTimer = async () => {
    try {
      await apiRequest("PATCH", API_ENDPOINTS.RESET_TIMER(contentId), {});

      // Reset local timer state
      setRemainingTime(initialTime);
      setTimerWidth(100);
      setIsExpired(false);

      // Restart the timer
      startTimer();
    } catch (error) {
      console.error("Failed to reset timer:", error);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start the timer on mount
  useEffect(() => {
    startTimer();
  }, [contentId, initialTime]);

  return {
    remainingTime,
    timerWidth,
    isExpired,
    startTimer,
    resetTimer,
    pauseTimer,
  };
}
