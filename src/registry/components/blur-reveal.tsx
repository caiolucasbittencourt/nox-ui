"use client";

import React from "react";
import { motion } from "framer-motion";
import { type ComponentEntry } from "../types";

function BlurRevealDemo() {
  const text = "Reveal the hidden";
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-4xl font-bold tracking-tight text-white">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

const code = `"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlurRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  blur?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function BlurReveal({
  text,
  delay = 0.15,
  duration = 0.6,
  blur = 12,
  className = "",
  as: Tag = "div",
}: BlurRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={\`flex flex-wrap gap-x-3 gap-y-2 \${className}\`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: \`blur(\${blur}px)\`, y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration,
            delay: i * delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}`;

export const blurReveal: ComponentEntry = {
  title: "Blur Reveal",
  slug: "blur-reveal",
  description:
    "Text that appears word-by-word with a blur-to-focus animation. Perfect for hero titles and landing pages.",
  demo: <BlurRevealDemo />,
  code,
  props: [
    {
      name: "text",
      type: "string",
      description: "The text to animate (split by spaces).",
      required: true,
    },
    {
      name: "delay",
      type: "number",
      default: "0.15",
      description: "Delay between each word animation in seconds.",
    },
    {
      name: "duration",
      type: "number",
      default: "0.6",
      description: "Duration of each word animation in seconds.",
    },
    {
      name: "blur",
      type: "number",
      default: "12",
      description: "Initial blur amount in pixels.",
    },
    {
      name: "as",
      type: '"h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"',
      default: '"div"',
      description: "HTML element to render as wrapper.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: ["framer-motion"],
  usage: `import { BlurReveal } from "@/components/ui/blur-reveal";

export default function Page() {
  return (
    <BlurReveal
      text="Welcome to the future"
      className="text-5xl font-bold text-white"
    />
  );
}`,
};
