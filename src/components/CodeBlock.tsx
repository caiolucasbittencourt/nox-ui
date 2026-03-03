"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@/hooks";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
}

export default function CodeBlock({
  code,
  language = "bash",
  showLineNumbers = true,
  title,
}: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard();

  const lines = code.split("\n");

  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-700/50 bg-black">
      {/* Header (optional) */}
      {title && (
        <div className="border-b border-neutral-800/60 px-4 py-2.5">
          <span className="text-xs font-medium text-neutral-500">{title}</span>
        </div>
      )}

      {/* Copy button */}
      <button
        onClick={() => copy(code)}
        aria-label={copied ? "Copied" : "Copy code"}
        className={`absolute top-3 right-3 z-10 flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium opacity-0 transition-all group-hover:opacity-100 ${
          copied
            ? "text-emerald-400"
            : "text-neutral-600 hover:bg-white/[0.04] hover:text-neutral-300"
        }`}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>

      {/* Code */}
      <div className="dark-scrollbar overflow-x-auto p-4">
        <pre className="code-block">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="mr-6 inline-block w-5 text-right text-neutral-700 select-none">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1 text-neutral-300">
                  {highlightLine(line, language)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

/* ── React-based syntax highlighting (no dangerouslySetInnerHTML) ── */

function highlightLine(line: string, language: string): React.ReactNode {
  if (language === "bash" || language === "shell") {
    return highlightTokens(line, [
      {
        pattern: /\b(npx|npm|cd|yarn|pnpm|run|dev|install)\b/g,
        className: "text-green-400",
      },
      { pattern: /(@\S+)/g, className: "text-yellow-400" },
    ]);
  }

  if (language === "typescript" || language === "tsx") {
    return highlightTokens(line, [
      {
        pattern:
          /\b(import|from|export|function|const|let|return|default|type|interface)\b/g,
        className: "text-purple-400",
      },
      { pattern: /("[^"]*"|'[^']*'|`[^`]*`)/g, className: "text-green-400" },
      { pattern: /(\/\/.*)/g, className: "text-neutral-600" },
    ]);
  }

  return line;
}

interface TokenRule {
  pattern: RegExp;
  className: string;
}

function highlightTokens(line: string, rules: TokenRule[]): React.ReactNode {
  // Build a combined regex from all rules
  const parts: { text: string; className?: string }[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let earliestMatch: {
      index: number;
      length: number;
      text: string;
      className: string;
    } | null = null;

    for (const rule of rules) {
      // Reset lastIndex for global regexes
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
