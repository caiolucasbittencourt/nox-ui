"use client";

import { useState, useCallback } from "react";

interface UseCopyToClipboardOptions {
  timeout?: number;
}

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {},
): UseCopyToClipboardReturn {
  const { timeout = 2000 } = options;
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    },
    [timeout],
  );

  return { copied, copy };
}
