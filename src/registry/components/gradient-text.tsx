"use client";

import React from "react";
import { type ComponentEntry } from "../types";

function GradientTextDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="animate-gradient bg-gradient-to-r from-white via-neutral-400 to-white bg-[length:200%_auto] bg-clip-text text-4xl font-bold tracking-tight text-transparent">
        Gradient Flow
      </h1>
      <p className="animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_auto] bg-clip-text text-lg font-medium text-transparent">
        Beautiful animated gradient text
      </p>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-gradient {
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

const code = `"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string;
  duration?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function GradientText({
  children,
  colors = "from-white via-neutral-400 to-white",
  duration = 4,
  className = "",
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <>
      <Tag
        className={\`animate-gradient bg-gradient-to-r \${colors} bg-[length:200%_auto] bg-clip-text font-bold text-transparent \${className}\`}
        style={{ animationDuration: \`\${duration}s\` }}
      >
        {children}
      </Tag>
      <style>{\`
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-gradient {
          animation: gradient 4s linear infinite;
        }
      \`}</style>
    </>
  );
}`;

export const gradientText: ComponentEntry = {
  title: "Gradient Flow",
  slug: "gradient-text",
  description:
    "Animated gradient text with customizable colors and speed. Great for headings and highlights.",
  demo: <GradientTextDemo />,
  code,
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "Text content to display.",
      required: true,
    },
    {
      name: "colors",
      type: "string",
      default: '"from-white via-neutral-400 to-white"',
      description: "Tailwind gradient color classes.",
    },
    {
      name: "duration",
      type: "number",
      default: "4",
      description: "Animation duration in seconds.",
    },
    {
      name: "as",
      type: '"h1" | "h2" | "h3" | "h4" | "p" | "span"',
      default: '"span"',
      description: "HTML element to render.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  usage: `import { GradientText } from "@/components/ui/gradient-text";

export default function Page() {
  return (
    <GradientText as="h1" className="text-4xl">
      Welcome to the future
    </GradientText>
  );
}`,
};
