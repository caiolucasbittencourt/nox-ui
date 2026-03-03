"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type ComponentEntry } from "../types";

function AnimatedModalDemo() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-neutral-800 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:text-white active:scale-[0.97]"
      >
        Open Modal
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-neutral-800/60 bg-neutral-950 p-6"
            >
              <div className="flex items-center justify-between">
                <h3
                  id="modal-title"
                  className="text-base font-semibold text-white"
                >
                  Modal Title
                </h3>
                <button
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="text-neutral-600 transition-colors hover:text-neutral-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p
                id="modal-description"
                className="mt-3 text-[13px] leading-relaxed text-neutral-500"
              >
                This is a modal with enter and exit animation using Framer
                Motion. Click outside or on the X to close.
              </p>
              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleClose}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const code = `import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AnimatedModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  overlayClassName?: string;
  closeOnOverlay?: boolean;
}

export function AnimatedModal({
  children,
  open,
  onClose,
  title,
  className = "",
  overlayClassName = "",
  closeOnOverlay = true,
}: AnimatedModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={\`fixed inset-0 z-50 flex items-center
            justify-center bg-black/60 backdrop-blur-sm \${overlayClassName}\`}
          onClick={closeOnOverlay ? onClose : undefined}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className={\`w-full max-w-sm rounded-xl border
              border-neutral-800/60 bg-neutral-950 p-6 \${className}\`}
          >
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="text-neutral-600 transition-colors
                    hover:text-neutral-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`;

export const animatedModal: ComponentEntry = {
  title: "Spotlight Dialog",
  slug: "animated-modal",
  description: "Modal with enter/exit animation using Framer Motion.",
  demo: <AnimatedModalDemo />,
  code,
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "Modal content.",
      required: true,
    },
    {
      name: "open",
      type: "boolean",
      description: "Controls whether the modal is open.",
      required: true,
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback when the modal is closed.",
      required: true,
    },
    {
      name: "title",
      type: "string",
      description: "Modal title.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
    {
      name: "overlayClassName",
      type: "string",
      description: "CSS classes for the background overlay.",
    },
    {
      name: "closeOnOverlay",
      type: "boolean",
      default: "true",
      description: "Closes when the overlay is clicked.",
    },
  ],
  dependencies: ["framer-motion"],
  usage: `import { AnimatedModal } from "@/components/ui/animated-modal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <AnimatedModal open={open} onClose={() => setOpen(false)}>
        <p>Modal content</p>
      </AnimatedModal>
    </>
  );
}`,
};
