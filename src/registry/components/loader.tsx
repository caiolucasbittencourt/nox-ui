"use client";

import React from "react";
import { type ComponentEntry } from "../types";

function LoaderDemo() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
      <span className="text-sm text-neutral-400">Loading...</span>
    </div>
  );
}

const code = `export function Loader() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full 
        border-2 border-neutral-700 border-t-white" />
      <span className="text-sm text-neutral-400">
        Loading...
      </span>
    </div>
  );
}`;

export const loader: ComponentEntry = {
  title: "Orbit Spinner",
  slug: "loader",
  description: "Minimalist loading spinner with optional text.",
  demo: <LoaderDemo />,
  code,
  props: [],
  dependencies: [],
  usage: `import { Loader } from "@/components/ui/loader";

export default function Page() {
  return <Loader />;
}`,
};
