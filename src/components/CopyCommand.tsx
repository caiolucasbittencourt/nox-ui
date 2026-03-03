"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@/hooks";

interface CopyCommandProps {
  command: string;
}

interface TokenRule {
  pattern: RegExp;
  className: string;
}

function highlightTokens(text: string, rules: TokenRule[]): React.ReactNode {
  const parts: { text: string; className?: string }[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliestMatch: {
      index: number;
      length: number;
      text: string;
      className: string;
    } | null = null;

    for (const rule of rules) {
      const regex = new RegExp(rule.pattern.source, "g");
      const match = regex.exec(remaining);
      if (
        match &&
        (earliestMatch === null || match.index < earliestMatch.index)
      ) {
        earliestMatch = {
          index: match.index,
          length: match[0].length,
          text: match[0],
          className: rule.className,
        };
      }
    }

    if (earliestMatch === null) {
      parts.push({ text: remaining });
      break;
    }

    if (earliestMatch.index > 0) {
      parts.push({ text: remaining.slice(0, earliestMatch.index) });
    }

    parts.push({
      text: earliestMatch.text,
      className: earliestMatch.className,
    });
    remaining = remaining.slice(earliestMatch.index + earliestMatch.length);
  }

  return parts.map((part, i) =>
    part.className ? (
      <span key={i} className={part.className}>
        {part.text}
      </span>
    ) : (
      <React.Fragment key={i}>{part.text}</React.Fragment>
    )
  );
}

function highlightCommand(command: string): React.ReactNode {
  return highlightTokens(command, [
    {
      pattern: /\b(npx|npm|cd|yarn|pnpm|run|dev|install|create-next-app)\b/g,
      className: "text-green-400",
    },
    { pattern: /(--\S+)/g, className: "text-cyan-400" },
    { pattern: /(@\S+)/g, className: "text-yellow-400" },
  ]);
}

export default function CopyCommand({ command }: CopyCommandProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="group relative mt-6 rounded-xl border border-neutral-700/50 bg-black px-5 py-4">
      {command.includes("\n") ? (
        <pre className="text-[13px] leading-relaxed text-neutral-300">
          {command.split("\n").map((line, i) => (
            <div key={i}>{highlightCommand(line)}</div>
          ))}
        </pre>
      ) : (
        <code className="text-[13px] text-neutral-300">
          {highlightCommand(command)}
        </code>
      )}
      <button
        onClick={() => copy(command)}
        aria-label={copied ? "Copied" : "Copy command"}
        className={`absolute top-3 right-3 flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium opacity-0 transition-all group-hover:opacity-100 ${
          copied
            ? "text-emerald-400"
            : "text-neutral-600 hover:bg-white/[0.04] hover:text-neutral-300"
        }`}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
