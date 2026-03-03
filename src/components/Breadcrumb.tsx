"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { componentSlugs, componentMap } from "@/registry";

export default function Breadcrumb() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "";

  const isComponentPage = componentSlugs.includes(currentSlug);

  // Get the title from componentMap if it's a component, otherwise format the slug
  const getTitle = (slug: string) => {
    if (isComponentPage && componentMap[slug]) {
      return componentMap[slug].title;
    }
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="mb-8 flex items-center gap-2 border-b border-neutral-800/60 pb-6 text-sm">
      <Link
        href="/docs/introduction"
        className="text-neutral-500 transition-colors hover:text-white"
      >
        {isComponentPage ? "Components" : "Docs"}
      </Link>
      <ChevronRight className="h-4 w-4 text-neutral-600" />
      <span className="font-medium text-white">{getTitle(currentSlug)}</span>
    </nav>
  );
}
