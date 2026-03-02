"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ComponentEntry } from "../types";

const slides = [
  { id: 1, label: "Slide 1", color: "from-violet-500/20 to-fuchsia-500/20" },
  { id: 2, label: "Slide 2", color: "from-sky-500/20 to-cyan-500/20" },
  { id: 3, label: "Slide 3", color: "from-amber-500/20 to-orange-500/20" },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
};

function CarouselDemo() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const go = (dir: number) => {
    setIndex([(index + dir + slides.length) % slides.length, dir]);
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <div className="relative h-44 w-full overflow-hidden rounded-lg border border-neutral-800/60 bg-neutral-950">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${slides[index].color}`}
          >
            <span className="text-lg font-medium text-neutral-300">
              {slides[index].label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => go(-1)}
          className="rounded-md border border-neutral-800/60 bg-neutral-900 p-1.5 text-neutral-400 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-neutral-700"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="rounded-md border border-neutral-800/60 bg-neutral-900 p-1.5 text-neutral-400 transition-colors hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const code = `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: React.ReactNode[];
  className?: string;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
};

export function Carousel({ items, className = "" }: CarouselProps) {
  const [[index, direction], setIndex] = useState([0, 0]);

  const go = (dir: number) => {
    setIndex([(index + dir + items.length) % items.length, dir]);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative h-44 w-full overflow-hidden rounded-lg 
        border border-neutral-800/60 bg-neutral-950">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div key={index} custom={direction}
            variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center 
              justify-center">
            {items[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => go(-1)}
          className="rounded-md border border-neutral-800/60 
            bg-neutral-900 p-1.5 text-neutral-400 
            transition-colors hover:text-white">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <div key={i}
              className={\`h-1.5 w-1.5 rounded-full transition-colors 
                \${i === index ? "bg-white" : "bg-neutral-700"}\`} />
          ))}
        </div>
        <button onClick={() => go(1)}
          className="rounded-md border border-neutral-800/60 
            bg-neutral-900 p-1.5 text-neutral-400 
            transition-colors hover:text-white">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}`;

export const carousel: ComponentEntry = {
  title: "Slide Drift",
  slug: "carousel",
  description:
    "Carousel with animated slide transitions and position indicators.",
  demo: <CarouselDemo />,
  code,
  props: [
    {
      name: "items",
      type: "React.ReactNode[]",
      description: "Array of elements to be displayed as slides.",
      required: true,
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: ["framer-motion", "lucide-react"],
  usage: `import { Carousel } from "@/components/ui/carousel";

const slides = [
  <div>Slide 1</div>,
  <div>Slide 2</div>,
  <div>Slide 3</div>,
];

export default function Page() {
  return <Carousel items={slides} />;
}`,
};
