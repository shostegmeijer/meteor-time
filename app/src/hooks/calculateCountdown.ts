import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date, currentTime: Date) => {
  const difference = +targetDate - +currentTime;

  const timeLeft: TimeLeft = {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };

  return timeLeft;
};

export const useCountdown = (targetDate: Date = new Date("2026"), onComplete: () => void, currentTimeOverride?: Date) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate, currentTimeOverride || new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate, currentTimeOverride || new Date());
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days <= 0 && newTimeLeft.hours <= 0 && newTimeLeft.minutes <= 0 && newTimeLeft.seconds <= 0) {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete, currentTimeOverride]);

  return timeLeft;
};

