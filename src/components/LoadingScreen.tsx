import React, { useState, useEffect } from "react";
import { Sparkles, Code2, Terminal } from "lucide-react";

interface LoadingScreenProps {
  onLoaded?: () => void;
  minDuration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoaded,
  minDuration = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(
    "Initializing event environment...",
  );
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent background scrolling during initial load
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(
        100,
        Math.floor((elapsed / minDuration) * 100),
      );

      setProgress(currentProgress);

      if (currentProgress < 25) {
        setStatusText("Bootstrapping Buildathon 2.0 system...");
      } else if (currentProgress < 50) {
        setStatusText("Loading CIT Gubbi campus assets & schedule...");
      } else if (currentProgress < 75) {
        setStatusText("Syncing domains, rules & problem tracks...");
      } else if (currentProgress < 95) {
        setStatusText("Configuring 24-hour hackathon console...");
      } else {
        setStatusText("System ready. Welcome to Buildathon 2.0!");
      }

      if (elapsed >= minDuration) {
        clearInterval(interval);
        setProgress(100);

        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = "";
            if (onLoaded) onLoaded();
          }, 600); // 600ms smooth fade duration
        }, 300);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [minDuration, onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#071224] text-white transition-opacity duration-600 ease-out select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-rose-500/15 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      {/* Main loading card content */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* CIT Official Logo */}
        <div className="relative mb-6 group">
          <div className="p-2.5 bg-white shadow-xl shadow-sky-950/50 flex items-center justify-center transition-transform transform hover:scale-105 border border-slate-700/50">
            <img
              src="/cit_logo.jpg"
              alt="Channabasaveshwara Institute of Technology Logo"
              className="h-14 sm:h-16 w-auto object-contain rounded-none"
            />
          </div>
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-sm border border-sky-400/30 animate-pulse pointer-events-none" />
        </div>

        {/* Institution & Department Typography */}
        <div className="space-y-1 mb-6">
          <h2 className="font-heading font-black tracking-tight text-sm sm:text-base text-white uppercase leading-tight">
            Channabasaveshwara Institute of Technology
          </h2>
          <p className="text-[11px] font-mono text-sky-400 tracking-wider uppercase font-semibold">
            Department of Computer Science & Engineering
          </p>
        </div>

        {/* Event Title Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/70 text-slate-300 text-xs font-mono mb-2">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span className="tracking-wide">
              National Level 24-Hour Hackathon
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white">
            BUILDATHON{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              2.0
            </span>
          </h1>
          <p className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase mt-1">
            Innovate • Code • Impact
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72 space-y-2.5">
          <div className="relative h-2 w-full bg-slate-900/90 rounded-full overflow-hidden border border-slate-800/90 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-rose-500 to-pink-500 transition-all duration-100 ease-out shadow-sm shadow-rose-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 text-[11px] truncate max-w-[200px] text-left">
              {statusText}
            </span>
            <span className="text-sky-400 font-bold ml-2">{progress}%</span>
          </div>
        </div>

        {/* Bottom subtle indicator */}
        <div className="mt-8 flex items-center gap-2 text-slate-500 text-[10px] font-mono">
          <Sparkles
            className="w-3 h-3 text-amber-400 animate-spin"
            style={{ animationDuration: "3s" }}
          />
          <span>CIT Gubbi Campus • 30 & 31 Oct 2026</span>
        </div>
      </div>
    </div>
  );
};
