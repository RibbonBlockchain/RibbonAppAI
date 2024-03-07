import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetTime: number;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownBox = ({ value }: { value: number }) => {
  return (
    <p
      className={`text-xs font-normal p-1 w-[27px] h-[27px] text-black border-custom`}
    >
      {value}
    </p>
  );
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetTime - new Date().getTime();
    let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="flex flex-row gap-1 items-center justify-center ">
        <CountdownBox value={timeLeft.hours} />
        :
        <CountdownBox value={timeLeft.minutes} />
        :
        <CountdownBox value={timeLeft.seconds} />
      </div>
    </>
  );
};

export default CountdownTimer;
