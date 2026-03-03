"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  label: string;
}

export default function AutoTableOfContents() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Scan page for headings with IDs
  useEffect(() => {
    const scanHeadings = () => {
      const main = document.querySelector("main");
      if (!main) return;

      const headings = main.querySelectorAll("h2[id], section[id] > h2");
      const tocItems: TocItem[] = [];

      headings.forEach((heading) => {
        const section = heading.closest("section[id]");
        const id = section?.id || heading.id;
        const label = heading.textContent?.trim() || "";

        if (id && label && !tocItems.some((item) => item.id === id)) {
          tocItems.push({ id, label });
        }
      });

      setItems(tocItems);
      if (tocItems.length > 0) {
        setActiveId(tocItems[0].id);
      }
    };

    const timer = setTimeout(scanHeadings, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Find first visible h2 title on screen
  const updateActiveSection = useCallback(() => {
    if (items.length === 0) return;

    const scrollRoot = document.querySelector("main");
    if (!scrollRoot) return;

    const mainRect = scrollRoot.getBoundingClientRect();

    // Check if at bottom - activate last item
    const isAtBottom =
      scrollRoot.scrollHeight - scrollRoot.scrollTop - scrollRoot.clientHeight <
      50;

    if (isAtBottom) {
      setActiveId(items[items.length - 1].id);
      return;
    }

    // Find the first h2 that is visible in the viewport
    for (const item of items) {
      const section = document.getElementById(item.id);
      if (!section) continue;

      // Get the h2 inside the section, or the section itself if it's a h2
      const h2 =
        section.tagName === "H2" ? section : section.querySelector("h2");
      if (!h2) continue;

      const rect = h2.getBoundingClientRect();

      // Check if this h2 is visible within the main scroll area
      const isVisible = rect.top >= mainRect.top && rect.top <= mainRect.bottom;

      if (isVisible) {
        setActiveId(item.id);
        return;
      }
    }

    // If no h2 is visible, find the last one that's above the viewport
    for (let i = items.length - 1; i >= 0; i--) {
      const section = document.getElementById(items[i].id);
      if (!section) continue;

      const h2 =
        section.tagName === "H2" ? section : section.querySelector("h2");
      if (!h2) continue;

      const rect = h2.getBoundingClientRect();

      if (rect.top < mainRect.top) {
        setActiveId(items[i].id);
        return;
      }
    }
  }, [items]);

  // Listen to scroll events
  useEffect(() => {
    if (items.length === 0) return;

    const scrollRoot = document.querySelector("main");
    if (!scrollRoot) return;

    updateActiveSection();

    scrollRoot.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () => {
      scrollRoot.removeEventListener("scroll", updateActiveSection);
    };
  }, [items, updateActiveSection]);

  if (items.length === 0) return null;

  return (
    <aside className="sticky top-0 h-fit pt-8 pl-5 pr-5">
      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
        On this page
      </p>
      <nav className="mt-4 flex flex-col gap-0.5 border-l border-neutral-800/60">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`cursor-pointer px-3 py-1.5 text-left text-sm transition-colors ${
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
