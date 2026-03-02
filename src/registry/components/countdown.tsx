"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type ComponentEntry } from "../types";

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-neutral-800/60 bg-neutral-950">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-2xl font-semibold tabular-nums text-white"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[11px] uppercase tracking-wider text-neutral-600">
        {label}
      </span>
    </div>
  );
}

function CountdownDemo() {
  const [target] = useState(
    () =>
      new Date(
        Date.now() + 4 * 86400000 + 7 * 3600000 + 23 * 60000 + 45 * 1000,
      ),
  );
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <div className="flex items-center gap-3">
      <Digit value={days} label="Days" />
      <span className="mt-[-20px] text-lg text-neutral-700">:</span>
      <Digit value={hours} label="Hours" />
      <span className="mt-[-20px] text-lg text-neutral-700">:</span>
      <Digit value={minutes} label="Min" />
      <span className="mt-[-20px] text-lg text-neutral-700">:</span>
      <Digit value={seconds} label="Sec" />
    </div>
  );
}

const code = `import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-16 w-16 items-center justify-center 
        overflow-hidden rounded-lg border border-neutral-800/60 
        bg-neutral-950">
        <AnimatePresence mode="popLayout">
          <motion.span key={display}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-2xl font-semibold tabular-nums text-white">
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[11px] uppercase tracking-wider 
        text-neutral-600">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ targetDate, className = "" }: CountdownProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className={\`flex items-center gap-3 \${className}\`}>
      <Digit value={days} label="Days" />
      <span className="mt-[-20px] text-lg text-neutral-700">:</span>
      <Digit value={hours} label="Hours" />
      <span className="mt-[-20px] text-lg text-neutral-700">:</span>
      <Digit value={minutes} label="Min" />
      <span className="mt-[-20px] text-lg text-neutral-700">:</span>
      <Digit value={seconds} label="Sec" />
    </div>
  );
}`;

export const countdown: ComponentEntry = {
  title: "Flip Clock",
  slug: "countdown",
  description:
    "Countdown timer with flip animation on digits, updated every second.",
  demo: <CountdownDemo />,
  code,
  props: [
    {
      name: "targetDate",
      type: "Date",
      description: "Target date for the countdown.",
      required: true,
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: ["framer-motion"],
  usage: `import { Countdown } from "@/components/ui/countdown";

export default function Page() {
  const target = new Date("2026-12-31T23:59:59");
  return <Countdown targetDate={target} />;
}`,
};
