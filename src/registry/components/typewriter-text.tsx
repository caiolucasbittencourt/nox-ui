"use client";

import React, { useState, useEffect, useCallback } from "react";
import { type ComponentEntry } from "../types";

function TypewriterDemo() {
  const words = ["Beautiful.", "Modern.", "Minimal.", "Powerful."];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = words[index];
    if (!deleting) {
      setText(current.slice(0, text.length + 1));
      if (text.length + 1 === current.length) {
        setTimeout(() => setDeleting(true), 1500);
        return;
      }
    } else {
      setText(current.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
    }
  }, [text, deleting, index, words]);

  useEffect(() => {
    const speed = deleting ? 50 : 100;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, deleting]);

  return (
    <div className="flex items-center gap-1 text-3xl font-bold tracking-tight text-white">
      <span>Design is</span>
      <span className="text-neutral-400">{text}</span>
      <span className="animate-blink ml-0.5 inline-block h-8 w-[2px] bg-white" />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
    </div>
  );
}

const code = `"use client";

import React, { useState, useEffect, useCallback } from "react";

interface TypewriterTextProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  prefix?: string;
  className?: string;
  cursorClassName?: string;
}

export function TypewriterText({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 1500,
  prefix = "",
  className = "",
  cursorClassName = "",
}: TypewriterTextProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = words[index];
    if (!deleting) {
      setText(current.slice(0, text.length + 1));
      if (text.length + 1 === current.length) {
        setTimeout(() => setDeleting(true), pauseDuration);
        return;
      }
    } else {
      setText(current.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
    }
  }, [text, deleting, index, words, pauseDuration]);

  useEffect(() => {
    const speed = deleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, deleting, deleteSpeed, typeSpeed]);

  return (
    <span className={className}>
      {prefix && <span>{prefix}</span>}
      <span>{text}</span>
      <span
        className={\`ml-0.5 inline-block h-[1em] w-[2px] animate-blink bg-current \${cursorClassName}\`}
      />
      <style>{\`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      \`}</style>
    </span>
  );
}`;

export const typewriterText: ComponentEntry = {
  title: "Typewriter",
  slug: "typewriter-text",
  description:
    "Animated typewriter effect that cycles through a list of words. Perfect for hero sections.",
  demo: <TypewriterDemo />,
  code,
  props: [
    {
      name: "words",
      type: "string[]",
      description: "Array of words to cycle through.",
      required: true,
    },
    {
      name: "typeSpeed",
      type: "number",
      default: "100",
      description: "Typing speed in ms per character.",
    },
    {
      name: "deleteSpeed",
      type: "number",
      default: "50",
      description: "Deleting speed in ms per character.",
    },
    {
      name: "pauseDuration",
      type: "number",
      default: "1500",
      description: "Pause in ms before deleting starts.",
    },
    {
      name: "prefix",
      type: "string",
      description: "Static text displayed before the animated word.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the wrapper.",
    },
    {
      name: "cursorClassName",
      type: "string",
      description: "Additional CSS classes for the cursor.",
    },
  ],
  usage: `import { TypewriterText } from "@/components/ui/typewriter-text";

export default function Page() {
  return (
    <h1 className="text-4xl font-bold text-white">
      <TypewriterText
        words={["Beautiful.", "Modern.", "Minimal."]}
        prefix="Design is "
      />
    </h1>
  );
}`,
};
