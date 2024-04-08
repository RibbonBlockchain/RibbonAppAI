import React, { useEffect, useState } from "react";

export default function SimpleCountdownTimer() {
  const storedTime = localStorage.getItem("countdownTime");
  const initialTime = storedTime ? parseInt(storedTime, 10) : 43200;
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          return 0;
        } else {
          const newTime = prevTime - 1;
          localStorage.setItem("countdownTime", newTime.toString());
          return newTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <div className="">
      <p>
        {`${hours}`.padStart(2, "0")}:{`${minutes}`.padStart(2, "0")}:
        {`${seconds}`.padStart(2, "0")}
      </p>
    </div>
  );
}
