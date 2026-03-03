"use client";

import React from "react";
import { type ComponentEntry } from "../types";

function FloatingNavbarDemo() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/80 px-1 py-1 backdrop-blur-sm">
      {["Home", "About", "Blog", "Contact"].map((item) => (
        <button
          key={item}
          className="rounded-full px-4 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:bg-white/6 hover:text-white"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

const code = `interface NavLink {
  label: string;
  href: string;
}

interface FloatingNavbarProps {
  links: NavLink[];
  className?: string;
}

export function FloatingNavbar({
  links,
  className = "",
}: FloatingNavbarProps) {
  return (
    <nav
      className={\`inline-flex items-center gap-1
        rounded-full border border-neutral-800
        bg-neutral-900/80 px-1 py-1 backdrop-blur-sm \${className}\`}
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-full px-4 py-1.5 text-xs
            font-medium text-neutral-400 transition-colors
            hover:bg-white/6 hover:text-white"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}`;

export const floatingNavbar: ComponentEntry = {
  title: "Float Dock",
  slug: "floating-navbar",
  description:
    "Floating navigation bar with pill shape and background blur effect.",
  demo: <FloatingNavbarDemo />,
  code,
  props: [
    {
      name: "links",
      type: "NavLink[]",
      description: "Array of navigation links with label and href.",
      required: true,
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: [],
  usage: `import { FloatingNavbar } from "@/components/ui/floating-navbar";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
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
