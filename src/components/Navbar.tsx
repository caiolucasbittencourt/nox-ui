"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchItem {
  label: string;
  slug: string;
}

interface NavbarProps {
  searchItems?: SearchItem[];
}

export default function Navbar({ searchItems = [] }: NavbarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? searchItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return;
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (slug: string) => {
    router.push(`/docs/${slug}`);
    setQuery("");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/60 bg-black/80 backdrop-blur-xl">
      <nav
        className="flex h-[56px] items-center"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo — matches sidebar width */}
        <div className="flex w-[260px] shrink-0 items-center gap-2.5 px-5">
          <Link
            href="/docs/introduction"
            className="text-sm font-semibold tracking-wide text-white hover:opacity-80 transition-opacity"
          >
            Nox UI
          </Link>
          <span className="text-[10px] font-medium leading-none text-neutral-400">
            v0.1.0
          </span>
        </div>

        {/* Right area — aligned with main content */}
        <div className="flex flex-1 items-center justify-end gap-5 pl-16 pr-5">
          {/* Search */}
          <div ref={ref} className="relative hidden w-full max-w-xs md:block">
            <div className="flex items-center gap-3 rounded-xl border border-neutral-700/50 bg-black px-4 py-2">
              <Search
                className="h-3.5 w-3.5 text-neutral-500"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => query.trim() && setOpen(true)}
                placeholder="Search components..."
                aria-label="Search components"
                className="w-full bg-transparent text-[13px] text-neutral-300 placeholder:text-neutral-500 outline-none"
              />
              <kbd className="hidden rounded border border-neutral-800/60 px-1.5 py-0.5 text-[10px] text-neutral-600 lg:inline-block">
                /
              </kbd>
            </div>

            {open && filtered.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-neutral-700/50 bg-black shadow-2xl"
                role="listbox"
              >
                {filtered.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => handleNavigate(item.slug)}
                    role="option"
                    className="flex w-full cursor-pointer items-center px-4 py-3 text-left text-[13px] text-neutral-500 transition-colors hover:bg-neutral-800/50 hover:text-neutral-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {open && query.trim() && filtered.length === 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 rounded-xl border border-neutral-700/50 bg-black px-4 py-4 text-[13px] text-neutral-600 shadow-2xl">
                No results found.
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-neutral-400 transition-colors hover:text-white"
              aria-label="View on GitHub"
            >
              <img
                src="/github.svg"
                alt=""
                className="h-4 w-4"
                aria-hidden="true"
              />
              GitHub
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
