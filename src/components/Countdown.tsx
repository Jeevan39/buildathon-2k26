import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useCms } from "../context/CmsContext";
import { eventData } from "../data/hackathonData";

interface CountdownProps {
  targetDate?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate: propDate,
}) => {
  const cms = useCms();
  const rawTarget =
    propDate ||
    cms?.hero?.countdownTargetDate ||
    cms?.event?.dateStart ||
    eventData.dateStart;
  const targetDate = new Date(rawTarget).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between gap-2 px-1 mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <Clock className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          <span>HACKATHON COMMENCES IN</span>
        </div>
        <span className="text-[11px] font-mono font-medium text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded-full border border-sky-200">
          30 OCT 2026 • CIT GUBBI
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
        {units.map((unit, index) => (
          <div
            key={unit.label}
            className="relative bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-slate-200/90 shadow-sm shadow-slate-900/5 hover:border-sky-300 transition-all text-center group"
          >
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-3 h-0.5 bg-gradient-to-r from-sky-400 via-rose-400 to-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0b1d3a] tracking-tight leading-none">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 font-mono">
              {unit.label}
            </div>

            {/* Subtle corner badge */}
            <div className="absolute bottom-1 right-1.5 text-[8px] text-slate-300 font-mono hidden sm:block">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
