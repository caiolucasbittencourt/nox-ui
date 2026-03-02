"use client";

import React from "react";
import { type ComponentEntry } from "../types";

function GlitchTextDemo() {
  return (
    <div className="flex items-center justify-center">
      <span className="glitch-text relative text-4xl font-bold tracking-tight text-white">
        GLITCH
        <span
          className="glitch-copy glitch-copy-1 absolute inset-0"
          aria-hidden
        >
          GLITCH
        </span>
        <span
          className="glitch-copy glitch-copy-2 absolute inset-0"
          aria-hidden
        >
          GLITCH
        </span>
      </span>
      <style>{`
        .glitch-text {
          position: relative;
        }
        .glitch-copy {
          color: white;
          clip-path: inset(0);
        }
        .glitch-copy-1 {
          text-shadow: -2px 0 #ff00ff;
          animation: glitch-1 2.5s infinite linear alternate-reverse;
        }
        .glitch-copy-2 {
          text-shadow: 2px 0 #00ffff;
          animation: glitch-2 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-1 {
          0% { clip-path: inset(40% 0 61% 0); }
          10% { clip-path: inset(92% 0 1% 0); }
          20% { clip-path: inset(43% 0 1% 0); }
          30% { clip-path: inset(25% 0 58% 0); }
          40% { clip-path: inset(54% 0 7% 0); }
          50% { clip-path: inset(58% 0 43% 0); }
          60% { clip-path: inset(5% 0 35% 0); }
          70% { clip-path: inset(75% 0 5% 0); }
          80% { clip-path: inset(13% 0 16% 0); }
          90% { clip-path: inset(2% 0 73% 0); }
          100% { clip-path: inset(15% 0 50% 0); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(65% 0 4% 0); }
          10% { clip-path: inset(15% 0 61% 0); }
          20% { clip-path: inset(79% 0 1% 0); }
          30% { clip-path: inset(60% 0 8% 0); }
          40% { clip-path: inset(3% 0 55% 0); }
          50% { clip-path: inset(70% 0 22% 0); }
          60% { clip-path: inset(40% 0 15% 0); }
          70% { clip-path: inset(10% 0 47% 0); }
          80% { clip-path: inset(85% 0 5% 0); }
          90% { clip-path: inset(55% 0 30% 0); }
          100% { clip-path: inset(20% 0 65% 0); }
        }
      `}</style>
    </div>
  );
}

const code = `"use client";

import React from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function GlitchText({
  children,
  className = "",
  as: Tag = "span",
}: GlitchTextProps) {
  return (
    <>
      <Tag className={\`glitch-text relative \${className}\`}>
        {children}
        <span className="glitch-copy glitch-copy-1 absolute inset-0" aria-hidden>
          {children}
        </span>
        <span className="glitch-copy glitch-copy-2 absolute inset-0" aria-hidden>
          {children}
        </span>
      </Tag>
      <style>{\`
        .glitch-text {
          position: relative;
        }
        .glitch-copy {
          color: inherit;
          clip-path: inset(0);
        }
        .glitch-copy-1 {
          text-shadow: -2px 0 #ff00ff;
          animation: glitch-1 2.5s infinite linear alternate-reverse;
        }
        .glitch-copy-2 {
          text-shadow: 2px 0 #00ffff;
          animation: glitch-2 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-1 {
          0% { clip-path: inset(40% 0 61% 0); }
          10% { clip-path: inset(92% 0 1% 0); }
          20% { clip-path: inset(43% 0 1% 0); }
          30% { clip-path: inset(25% 0 58% 0); }
          40% { clip-path: inset(54% 0 7% 0); }
          50% { clip-path: inset(58% 0 43% 0); }
          60% { clip-path: inset(5% 0 35% 0); }
          70% { clip-path: inset(75% 0 5% 0); }
          80% { clip-path: inset(13% 0 16% 0); }
          90% { clip-path: inset(2% 0 73% 0); }
          100% { clip-path: inset(15% 0 50% 0); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(65% 0 4% 0); }
          10% { clip-path: inset(15% 0 61% 0); }
          20% { clip-path: inset(79% 0 1% 0); }
          30% { clip-path: inset(60% 0 8% 0); }
          40% { clip-path: inset(3% 0 55% 0); }
          50% { clip-path: inset(70% 0 22% 0); }
          60% { clip-path: inset(40% 0 15% 0); }
          70% { clip-path: inset(10% 0 47% 0); }
          80% { clip-path: inset(85% 0 5% 0); }
          90% { clip-path: inset(55% 0 30% 0); }
          100% { clip-path: inset(20% 0 65% 0); }
        }
      \`}</style>
    </>
  );
}`;

export const glitchText: ComponentEntry = {
  title: "Glitch Text",
  slug: "glitch-text",
  description:
    "Cyberpunk-style glitch text effect with chromatic aberration. Eye-catching for headings.",
  demo: <GlitchTextDemo />,
  code,
  props: [
    {
      name: "children",
      type: "string",
      description: "Text content to display.",
      required: true,
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
  usage: `import { GlitchText } from "@/components/ui/glitch-text";

export default function Page() {
  return (
    <GlitchText as="h1" className="text-5xl font-bold text-white">
      SYSTEM ERROR
    </GlitchText>
  );
}`,
};
