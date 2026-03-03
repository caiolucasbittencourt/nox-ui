"use client";

import React, { useState } from "react";
import { type ComponentEntry } from "../types";

function StatefulButtonDemo() {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      onClick={() => setClicked(!clicked)}
      className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all active:scale-[0.97] ${
        clicked
          ? "bg-emerald-500 text-white"
          : "border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white"
      }`}
    >
      {clicked ? "Active ✓" : "Click here"}
    </button>
  );
}

const code = `import { useState } from "react";

interface StatefulButtonProps {
  defaultText?: string;
  activeText?: string;
  onToggle?: (isActive: boolean) => void;
  className?: string;
}

export function StatefulButton({
  defaultText = "Click here",
  activeText = "Active ✓",
  onToggle,
  className = "",
}: StatefulButtonProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const newState = !active;
    setActive(newState);
    onToggle?.(newState);
  };

  return (
    <button
      onClick={handleClick}
      className={\`rounded-lg px-5 py-2.5 text-sm font-medium
        transition-all active:scale-[0.97] \${
        active
          ? "bg-emerald-500 text-white"
          : "border border-neutral-700 text-neutral-300
             hover:border-neutral-500 hover:text-white"
      } \${className}\`}
    >
      {active ? activeText : defaultText}
    </button>
  );
}`;

export const statefulButton: ComponentEntry = {
  title: "Flux Toggle",
  slug: "stateful-button",
  description:
    "Button with a built-in toggle state. Changes appearance when clicked.",
  demo: <StatefulButtonDemo />,
  code,
  props: [
    {
      name: "defaultText",
      type: "string",
      default: '"Click here"',
      description: "Text displayed when button is inactive.",
    },
    {
      name: "activeText",
      type: "string",
      default: '"Active ✓"',
      description: "Text displayed when button is active.",
    },
    {
      name: "onToggle",
      type: "(isActive: boolean) => void",
      description: "Callback function called when state changes.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: [],
  usage: `import { StatefulButton } from "@/components/ui/stateful-button";

export default function Page() {
  return (
    <StatefulButton
      defaultText="Subscribe"
      activeText="Subscribed ✓"
      onToggle={(active) => {
        console.log("Subscribed:", active);
      }}
    />
  );
}`,
};
