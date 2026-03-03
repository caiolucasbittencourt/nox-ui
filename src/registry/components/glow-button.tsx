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

const code = `import { Zap } from "lucide-react";

interface GlowButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function GlowButton({
  children,
  icon = <Zap className="h-4 w-4" />,
  onClick,
  className = "",
}: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={\`relative inline-flex items-center gap-2
        rounded-full bg-white px-6 py-3 text-sm font-medium
        text-black transition-all
        hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]
        active:scale-[0.97] \${className}\`}
    >
      {icon}
      {children}
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
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "Button content.",
      required: true,
    },
    {
      name: "icon",
      type: "React.ReactNode",
      default: "<Zap />",
      description: "Icon displayed before the text.",
    },
    {
      name: "onClick",
      type: "() => void",
      description: "Click handler function.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: ["lucide-react"],
  usage: `import { GlowButton } from "@/components/ui/glow-button";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <GlowButton
      icon={<Sparkles className="h-4 w-4" />}
      onClick={() => console.log("clicked")}
    >
      Get Started
    </GlowButton>
  );
}`,
};
