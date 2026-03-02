"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { type ComponentEntry } from "../types";

const items = [
  {
    title: "What is Nox UI?",
    content:
      "Nox UI is a collection of ready-to-use React components you can copy and paste into your project. Built with Tailwind CSS and Framer Motion.",
  },
  {
    title: "Do I need to install any package?",
    content:
      "No. Just copy the component code into your project. The only dependencies are Tailwind CSS and Framer Motion.",
  },
  {
    title: "Can I customize the components?",
    content:
      "Yes. Since you have direct access to the code, you can change colors, sizes, animations, and any other aspect.",
  },
];

function AccordionDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-md space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-lg border border-neutral-800/60 bg-neutral-950"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-200 transition-colors hover:text-white"
            >
              {item.title}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 text-neutral-500" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-[13px] leading-relaxed text-neutral-500">
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const code = `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="w-full space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndexes.has(i);
        return (
          <div key={i}
            className="rounded-lg border border-neutral-800/60 
              bg-neutral-950">
            <button onClick={() => toggle(i)}
              className="flex w-full items-center justify-between 
                px-4 py-3 text-left text-sm font-medium 
                text-neutral-200 transition-colors hover:text-white">
              {item.title}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4 text-neutral-500" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden">
                  <p className="px-4 pb-4 text-[13px] leading-relaxed 
                    text-neutral-500">
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}`;

export const accordion: ComponentEntry = {
  title: "Stack Reveal",
  slug: "accordion",
  description:
    "Accordion with smooth expand/collapse animation via Framer Motion.",
  demo: <AccordionDemo />,
  code,
  props: [
    {
      name: "items",
      type: "AccordionItem[]",
      description: "Array of items with title and content.",
      required: true,
    },
    {
      name: "allowMultiple",
      type: "boolean",
      default: "false",
      description: "Allows opening multiple items at the same time.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: ["framer-motion", "lucide-react"],
  usage: `import { Accordion } from "@/components/ui/accordion";

const items = [
  { title: "Question 1", content: "Answer 1" },
  { title: "Question 2", content: "Answer 2" },
];

export default function Page() {
  return <Accordion items={items} />;
}`,
};
