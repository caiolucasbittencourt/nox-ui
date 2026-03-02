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

const code = `export function StatefulButton() {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      onClick={() => setClicked(!clicked)}
      className={\`rounded-lg px-5 py-2.5 text-sm font-medium 
        transition-all active:scale-[0.97] \${
        clicked
          ? "bg-emerald-500 text-white"
          : "border border-neutral-700 text-neutral-300 
             hover:border-neutral-500 hover:text-white"
      }\`}
    >
      {clicked ? "Active ✓" : "Click here"}
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
  props: [],
  dependencies: [],
  usage: `import { StatefulButton } from "@/components/ui/stateful-button";

export default function Page() {
  return (
    <StatefulButton
      onClick={async () => {
        await saveData();
      }}
    >
      Save
    </StatefulButton>
  );
}`,
};
