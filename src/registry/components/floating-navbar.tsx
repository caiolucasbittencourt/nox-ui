"use client";

import React from "react";
import { type ComponentEntry } from "../types";

function FloatingNavbarDemo() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/80 px-1 py-1 backdrop-blur-sm">
      {["Home", "About", "Blog", "Contact"].map((item) => (
        <button
          key={item}
          className="rounded-full px-4 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

const code = `export function FloatingNav() {
  return (
    <div className="inline-flex items-center gap-1 
      rounded-full border border-neutral-800 
      bg-neutral-900/80 px-1 py-1 backdrop-blur-sm">
      {["Home", "About", "Blog", "Contact"].map((item) => (
        <button
          key={item}
          className="rounded-full px-4 py-1.5 text-xs 
            font-medium text-neutral-400 transition-colors 
            hover:bg-white/[0.06] hover:text-white"
        >
          {item}
        </button>
      ))}
    </div>
  );
}`;

export const floatingNavbar: ComponentEntry = {
  title: "Float Dock",
  slug: "floating-navbar",
  description:
    "Floating navigation bar with pill shape and background blur effect.",
  demo: <FloatingNavbarDemo />,
  code,
  props: [],
  dependencies: [],
  usage: `import { FloatingNavbar } from "@/components/ui/floating-navbar";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Layout({ children }) {
  return (
    <>
      <FloatingNavbar links={links} />
      {children}
    </>
  );
}`,
};
