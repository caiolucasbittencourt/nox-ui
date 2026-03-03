"use client";

import React, { useEffect, useRef, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const visibleRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (items.length === 0) return;

    const scrollRoot = document.querySelector("main");
    if (!scrollRoot) return;

    visibleRef.current = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRef.current.add(entry.target.id);
          } else {
            visibleRef.current.delete(entry.target.id);
          }
        }
        setVisibleIds(new Set(visibleRef.current));
      },
      {
        root: scrollRoot,
        /* top offset accounts for navbar; bottom 0 means full viewport */
        rootMargin: "-60px 0px 0px 0px",
        threshold: 0,
      }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="sticky top-0 hidden w-[200px] shrink-0 self-start pt-6 xl:block">
      <p className="text-[13px] font-medium text-neutral-400">On this page</p>
      <nav className="mt-5 flex flex-col gap-1 border-l border-neutral-700/50">
        {items.map((item) => {
          const isActive = visibleIds.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`cursor-pointer px-3 py-1.5 text-left text-[13px] transition-colors ${
                isActive
                  ? "-ml-px border-l border-white text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
