"use client";

import React from "react";
import { Zap } from "lucide-react";
import { type ComponentEntry } from "../types";

function GlowButtonDemo() {
  return (
    <button className="relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] active:scale-[0.97]">
      <Zap className="h-4 w-4" />
      Get Started
    </button>
  );
}

const code = `export function GlowButton() {
  return (
    <button className="relative inline-flex items-center gap-2 
      rounded-full bg-white px-6 py-3 text-sm font-medium 
      text-black transition-all 
      hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] 
      active:scale-[0.97]">
      <Zap className="h-4 w-4" />
      Get Started
    </button>
  );
}`;

export const glowButton: ComponentEntry = {
  title: "Aurora Button",
  slug: "glow-button",
  description:
    "Button with a glow effect on hover. Ideal for CTAs and primary actions.",
  demo: <GlowButtonDemo />,
  code,
  props: [],
  dependencies: ["lucide-react"],
  usage: `import { GlowButton } from "@/components/ui/glow-button";

export default function Page() {
  return <GlowButton>Get Started</GlowButton>;
}`,
};
