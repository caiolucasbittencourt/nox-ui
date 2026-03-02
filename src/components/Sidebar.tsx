"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, BookOpen } from "lucide-react";

export interface SidebarItem {
  name: string;
  slug: string;
  isNew?: boolean;
}

export interface SidebarCategory {
  icon: React.ReactNode;
  title: string;
  items: SidebarItem[];
}

export interface GuideLink {
  name: string;
  slug: string;
}

interface SidebarProps {
  guideLinks?: GuideLink[];
  categories: SidebarCategory[];
}

export default function Sidebar({ guideLinks = [], categories }: SidebarProps) {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").pop() || "introduction";

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = { Guide: true };
      // Auto-open the section containing the active component
      for (const category of categories) {
        if (category.items.some((item) => item.slug === activeSlug)) {
          initial[category.title] = true;
        }
      }
      return initial;
    },
  );

  const toggle = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const guiaOpen = openSections["Guide"] ?? true;

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-neutral-700/50 bg-black scrollbar-hide">
      <nav
        className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-5 pb-4 pt-6 scrollbar-hide"
        role="navigation"
        aria-label="Documentation navigation"
      >
        {/* ── Guide section ── */}
        {guideLinks.length > 0 && (
          <div className="mb-1">
            <button
              onClick={() => toggle("Guide")}
              aria-expanded={guiaOpen}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-3 text-[13px] font-medium text-neutral-300 transition-colors hover:text-white"
            >
              <span className="flex h-4 w-4 items-center justify-center text-neutral-500">
                <BookOpen className="h-4 w-4" />
              </span>
              <span className="flex-1 text-left">Guide</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-600 transition-transform ${
                  guiaOpen ? "" : "-rotate-90"
                }`}
              />
            </button>

            {guiaOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-neutral-700/50 pl-3 pt-0.5">
                {guideLinks.map((link) => {
                  const isActive = activeSlug === link.slug;
                  return (
                    <Link
                      key={link.slug}
                      href={`/docs/${link.slug}`}
                      className={`flex items-center gap-2 rounded-md px-2 py-3 text-[13px] transition-colors ${
                        isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-neutral-500 hover:text-neutral-200"
                      }`}
                    >
                      <span className="truncate">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Separator */}
            <div className="mx-2 my-2 border-t border-neutral-700/50" />
          </div>
        )}

        {/* ── Component categories ── */}
        {categories.map((category) => {
          const isOpen = openSections[category.title] ?? false;

          return (
            <div key={category.title} className="mb-1">
              {/* Category header */}
              <button
                onClick={() => toggle(category.title)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-3 text-[13px] font-medium text-neutral-300 transition-colors hover:text-white"
              >
                <span className="flex h-4 w-4 items-center justify-center text-neutral-500">
                  {category.icon}
                </span>
                <span className="flex-1 text-left">{category.title}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-neutral-600 transition-transform ${
                    isOpen ? "" : "-rotate-90"
                  }`}
                />
              </button>

              {/* Items */}
              {isOpen && (
                <div className="ml-3 flex flex-col gap-1 border-l border-neutral-700/50 pl-3 pt-0.5">
                  {category.items.map((item) => {
                    const isActive = activeSlug === item.slug;
                    return (
                      <Link
                        key={item.slug}
                        href={`/docs/${item.slug}`}
                        className={`flex items-center gap-2 rounded-md px-2 py-3 text-[13px] transition-colors ${
                          isActive
                            ? "bg-white/[0.06] text-white"
                            : "text-neutral-500 hover:text-neutral-200"
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-neutral-700/50 px-5 py-4">
        <p className="text-[11px] leading-relaxed text-neutral-600">
          Built by{" "}
          <a
            href="https://github.com/caiolucasbittencourt"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-neutral-400 transition-colors hover:text-white"
          >
            Caio Bittencourt
          </a>
        </p>
        <p className="mt-0.5 text-[10px] text-neutral-700">
          © {new Date().getFullYear()} · MIT License
        </p>
      </div>
    </aside>
  );
}
