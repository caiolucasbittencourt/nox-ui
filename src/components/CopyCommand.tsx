"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@/hooks";

interface CopyCommandProps {
  command: string;
}

export default function CopyCommand({ command }: CopyCommandProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="group relative mt-6 rounded-xl border border-neutral-700/50 bg-black px-5 py-4">
      {command.includes("\n") ? (
        <pre className="text-[13px] leading-relaxed text-neutral-300">
          {command}
        </pre>
      ) : (
        <code className="text-[13px] text-neutral-300">{command}</code>
      )}
      <button
        onClick={() => copy(command)}
        aria-label={copied ? "Copied" : "Copy command"}
        className={`absolute right-3 top-3 flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium opacity-0 transition-all group-hover:opacity-100 ${
          copied
            ? "text-emerald-400"
            : "text-neutral-600 hover:text-neutral-300 hover:bg-white/[0.04]"
        }`}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
