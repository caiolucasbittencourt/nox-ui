"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";

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

interface SearchItem {
  label: string;
  slug: string;
}

interface SidebarProps {
  guideLinks?: GuideLink[];
  categories: SidebarCategory[];
  searchItems?: SearchItem[];
}

export default function Sidebar({
  guideLinks = [],
  categories,
  searchItems = [],
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const activeSlug = pathname.split("/").pop() || "introduction";

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      // Auto-open the section containing the active component
      for (const category of categories) {
        if (category.items.some((item) => item.slug === activeSlug)) {
          initial[category.title] = true;
        }
      }
      return initial;
    }
  );

  // Search state
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearching = query.trim().length > 0;

  const filtered = isSearching
    ? searchItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return;
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
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
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const toggle = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="scrollbar-hide flex h-full w-[260px] shrink-0 flex-col border-r border-neutral-800/60 bg-black">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4">
        <Link
          href="/docs/introduction"
          className="transition-opacity hover:opacity-80"
        >
          <span className="text-base font-semibold tracking-tight text-white">
            nox<span className="text-neutral-500">/</span>ui
          </span>
        </Link>
        <span className="rounded bg-neutral-800/80 px-1.5 py-0.5 text-[11px] font-medium text-neutral-500">
          v0.1.0
        </span>
      </div>

      {/* Search */}
      <div className="px-3 pb-4">
        <div className="flex items-center gap-2.5 rounded-lg border border-neutral-800/60 bg-neutral-900/50 px-3 py-2">
          <Search className="h-4 w-4 text-neutral-500" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            aria-label="Search components"
            className="w-full bg-transparent text-sm text-neutral-300 outline-none placeholder:text-neutral-600"
          />
          {isSearching ? (
            <button
              onClick={clearSearch}
              className="text-neutral-500 transition-colors hover:text-neutral-300"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden items-center gap-0.5 rounded border border-neutral-800 px-1.5 py-0.5 text-neutral-600 lg:inline-flex">
              <span className="text-xs leading-none">⌘</span>
              <span className="text-sm leading-none font-medium">K</span>
            </kbd>
          )}
        </div>
      </div>

      <nav
        className="scrollbar-hide flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-4"
        role="navigation"
        aria-label="Documentation navigation"
      >
        {/* ── Search Results ── */}
        {isSearching ? (
          <div className="flex flex-col gap-1">
            <p className="px-2 pb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
              Results ({filtered.length})
            </p>
            {filtered.length > 0 ? (
              filtered.map((item) => {
                const isActive = activeSlug === item.slug;
                return (
                  <button
                    key={item.slug}
                    onClick={() => handleNavigate(item.slug)}
                    className={`flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-white/[0.06] text-white"
                        : "text-neutral-400 hover:bg-neutral-800/30 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })
            ) : (
              <p className="px-2 py-4 text-center text-sm text-neutral-600">
                No results found for "{query}"
              </p>
            )}
          </div>
        ) : (
          <>
            {/* ── Guide links ── */}
            {guideLinks.length > 0 && (
              <div className="mb-2">
                <div className="flex flex-col gap-0.5">
                  {guideLinks.map((link) => {
                    const isActive = activeSlug === link.slug;
                    return (
                      <Link
                        key={link.slug}
                        href={`/docs/${link.slug}`}
                        className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-white/[0.06] text-white"
                            : "text-neutral-400 hover:bg-neutral-800/30 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{link.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Separator */}
                <div className="my-3 border-t border-neutral-800/60" />
              </div>
            )}

            {/* Section title */}
            <p className="px-2 pb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
              Components
            </p>

            {/* ── Component categories ── */}
            {categories.map((category) => {
              const isOpen = openSections[category.title] ?? false;
              const itemCount = category.items.length;

              return (
                <div key={category.title}>
                  {/* Category header */}
                  <button
                    onClick={() => toggle(category.title)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800/30 hover:text-white"
                  >
                    <span className="flex h-4 w-4 items-center justify-center text-neutral-500">
                      {category.icon}
                    </span>
                    <span className="flex-1 text-left">{category.title}</span>
                    <span className="text-xs text-neutral-600">
                      {itemCount}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-neutral-600 transition-transform ${
                        isOpen ? "" : "-rotate-90"
                      }`}
                    />
                  </button>

                  {/* Items */}
                  {isOpen && (
                    <div className="ml-3 flex flex-col gap-0.5 border-l border-neutral-800/60 py-1 pl-3">
                      {category.items.map((item) => {
                        const isActive = activeSlug === item.slug;
                        return (
                          <Link
                            key={item.slug}
                            href={`/docs/${item.slug}`}
                            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                              isActive
                                ? "bg-white/[0.06] text-white"
                                : "text-neutral-500 hover:text-neutral-200"
                            }`}
                          >
                            <span className="truncate">{item.name}</span>
                            {item.isNew && (
                              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                                NEW
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-neutral-800/60 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
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
          <a
            href="https://github.com/caiolucasbittencourt/nox-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-800/50 hover:text-white"
            aria-label="GitHub"
          >
            <img
              src="/github.svg"
              alt=""
              className="h-4 w-4"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </aside>
  );
}
