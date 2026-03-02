"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Palette } from "lucide-react";
import { type ComponentEntry } from "../types";

const gridItems = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Subtle animations",
    description: "Smooth transitions with Framer Motion on every interaction.",
    className: "md:col-span-2",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Performance",
    description: "Zero overhead. Lightweight and optimized components.",
    className: "md:col-span-1",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "TypeScript",
    description: "Full typing on all props.",
    className: "md:col-span-1",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Customizable",
    description:
      "Direct access to the code. Adapt colors, sizes, and behaviors.",
    className: "md:col-span-2",
  },
];

function BentoGridDemo() {
  return (
    <div className="grid w-full max-w-lg grid-cols-1 gap-3 md:grid-cols-3">
      {gridItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className={`group rounded-lg border border-neutral-800/60 bg-neutral-950 p-5 transition-colors hover:border-neutral-700 ${item.className}`}
        >
          <div className="text-neutral-500 transition-colors group-hover:text-neutral-300">
            {item.icon}
          </div>
          <h3 className="mt-3 text-sm font-medium text-neutral-200">
            {item.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

const code = `import { motion } from "framer-motion";

interface BentoGridItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

interface BentoGridProps {
  items: BentoGridItem[];
  columns?: 2 | 3 | 4;
}

export function BentoGrid({ items, columns = 3 }: BentoGridProps) {
  const colsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "md:grid-cols-4"
        : "md:grid-cols-3";

  return (
    <div className={\`grid grid-cols-1 gap-3 \${colsClass}\`}>
      {items.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className={\`group rounded-lg border border-neutral-800/60 
            bg-neutral-950 p-5 transition-colors 
            hover:border-neutral-700 \${item.className ?? ""}\`}>
          {item.icon && (
            <div className="text-neutral-500 transition-colors 
              group-hover:text-neutral-300">
              {item.icon}
            </div>
          )}
          <h3 className="mt-3 text-sm font-medium text-neutral-200">
            {item.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed 
            text-neutral-500">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}`;

export const bentoGrid: ComponentEntry = {
  title: "Mosaic Grid",
  slug: "bento-grid",
  description:
    "Bento-style grid with variable-sized cards and staggered entrance animation.",
  demo: <BentoGridDemo />,
  code,
  props: [
    {
      name: "items",
      type: "BentoGridItem[]",
      description:
        "Array of items with icon, title, description, and optional className for span.",
      required: true,
    },
    {
      name: "columns",
      type: "2 | 3 | 4",
      default: "3",
      description: "Number of columns in the grid.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: ["framer-motion"],
  usage: `import { BentoGrid } from "@/components/ui/bento-grid";

const items = [
  { title: "Feature 1", description: "Description" },
  { title: "Feature 2", description: "Description", className: "md:col-span-2" },
];

export default function Page() {
  return <BentoGrid items={items} />;
}`,
};
