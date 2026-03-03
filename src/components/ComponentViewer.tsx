"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Eye, Code2 } from "lucide-react";
import { useCopyToClipboard } from "@/hooks";

interface ComponentViewerProps {
  children: ReactNode;
  code: string;
  title?: string;
  description?: string;
}

type TabType = "preview" | "code";

export default function ComponentViewer({
  children,
  code,
  title,
  description,
}: ComponentViewerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("preview");
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="w-full">
      {/* Header */}
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h3 className="text-sm font-semibold text-white">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-[13px] text-neutral-500">{description}</p>
          )}
        </div>
      )}

      {/* Card */}
      <div className="overflow-hidden rounded-xl border border-neutral-700/50 bg-black">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-neutral-700/50 px-4 py-2.5">
          <div className="flex items-center gap-1">
            {(["preview", "code"] as TabType[]).map((tab) => {
              const Icon = tab === "preview" ? Eye : Code2;
              const label = tab === "preview" ? "Preview" : "Code";
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-neutral-600 hover:text-neutral-300"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="viewer-tab"
                      className="absolute inset-0 rounded-lg bg-white/[0.06]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Copy button */}
          <AnimatePresence>
            {activeTab === "code" && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => copy(code)}
                aria-label={copied ? "Copied" : "Copy code"}
                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  copied
                    ? "text-emerald-400"
                    : "text-neutral-600 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid-pattern flex min-h-[320px] items-center justify-center bg-black p-16"
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative bg-black"
            >
              <div className="p-9">
                <pre className="code-block">
                  <code className="text-neutral-400">{code}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
