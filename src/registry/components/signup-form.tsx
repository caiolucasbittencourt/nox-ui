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

const code = `import { useState } from "react";

interface SignupFormProps {
  onSubmit?: (data: { email: string }) => void;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function SignupForm({
  onSubmit,
  buttonText = "Create account",
  placeholder = "email@example.com",
  className = "",
}: SignupFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={\`w-full max-w-xs space-y-3 \${className}\`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-neutral-800
          bg-neutral-900 px-4 py-2.5 text-sm text-white
          placeholder:text-neutral-600 outline-none
          focus:border-neutral-600 transition-colors"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-white px-4
          py-2.5 text-sm font-medium text-black transition-all
          hover:bg-neutral-200 active:scale-[0.98]"
      >
        {buttonText}
      </button>
    </form>
  );
}`;

export const signupForm: ComponentEntry = {
  title: "Gateway Form",
  slug: "signup-form",
  description: "Minimalist signup form with input and button.",
  demo: <SignupFormDemo />,
  code,
  props: [
    {
      name: "onSubmit",
      type: "(data: { email: string }) => void",
      description: "Callback function called when form is submitted.",
    },
    {
      name: "buttonText",
      type: "string",
      default: '"Create account"',
      description: "Text displayed on the submit button.",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"email@example.com"',
      description: "Placeholder text for the email input.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  dependencies: [],
  usage: `import { SignupForm } from "@/components/ui/signup-form";

export default function Page() {
  return (
    <SignupForm
      onSubmit={(data) => {
        console.log(data.email);
      }}
      buttonText="Subscribe"
    />
  );
}`,
};
