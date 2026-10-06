import { useEffect, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

function diff(target: number): CountdownParts {
  const ms = target - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    finished: false,
  };
}

export function useCountdown(target: Date | null): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });

  const time = target ? target.getTime() : null;

  useEffect(() => {
    if (time === null) return;
    setParts(diff(time));
    const id = window.setInterval(() => setParts(diff(time)), 1000);
    return () => window.clearInterval(id);
  }, [time]);


  return parts;
}
