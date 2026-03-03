"use client";

import React from "react";
import { type ComponentEntry } from "../types";

function LoaderDemo() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
      <span className="text-sm text-neutral-400">Loading...</span>
    </div>
  );
}

const code = `interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4 border-[1.5px]",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-2",
};

export function Loader({
  text = "Loading...",
  size = "md",
  className = "",
}: LoaderProps) {
  return (
    <div className={\`flex items-center gap-3 \${className}\`}>
      <div
        className={\`animate-spin rounded-full
          border-neutral-700 border-t-white \${sizes[size]}\`}
      />
      {text && (
        <span className="text-sm text-neutral-400">{text}</span>
      )}
    </div>
  );
}`;

export const loader: ComponentEntry = {
  title: "Orbit Spinner",
  slug: "loader",
  description: "Minimalist loading spinner with optional text.",
  demo: <LoaderDemo />,
  code,
  props: [
    {
      name: "text",
      type: "string",
      default: '"Loading..."',
      description:
        "Text displayed next to the spinner. Pass empty string to hide.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the spinner.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: [],
  usage: `import { Loader } from "@/components/ui/loader";

export default function Page() {
  return (
    <>
      <Loader />
      <Loader text="Processing..." size="lg" />
      <Loader text="" size="sm" />
    </>
  );
}`,
};
