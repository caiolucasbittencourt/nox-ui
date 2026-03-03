"use client";

import React from "react";
import { type ComponentEntry } from "../types";

function SignupFormDemo() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <input
        type="email"
        placeholder="email@example.com"
        className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white transition-colors outline-none placeholder:text-neutral-600 focus:border-neutral-600"
      />
      <button className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-all hover:bg-neutral-200 active:scale-[0.98]">
        Create account
      </button>
    </div>
  );
}

const code = `export function SignupForm() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <input
        type="email"
        placeholder="email@example.com"
        className="w-full rounded-lg border border-neutral-800 
          bg-neutral-900 px-4 py-2.5 text-sm text-white 
          placeholder:text-neutral-600 outline-none 
          focus:border-neutral-600 transition-colors"
      />
      <button className="w-full rounded-lg bg-white px-4 
        py-2.5 text-sm font-medium text-black transition-all 
        hover:bg-neutral-200 active:scale-[0.98]">
        Create account
      </button>
    </div>
  );
}`;

export const signupForm: ComponentEntry = {
  title: "Gateway Form",
  slug: "signup-form",
  description: "Minimalist signup form with input and button.",
  demo: <SignupFormDemo />,
  code,
  props: [],
  dependencies: [],
  usage: `import { SignupForm } from "@/components/ui/signup-form";

export default function Page() {
  return (
    <SignupForm
      onSubmit={(data) => {
        console.log(data);
      }}
    />
  );
}`,
};
