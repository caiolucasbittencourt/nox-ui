"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { type ComponentEntry } from "../types";

function ConfirmModalDemo() {
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
        className="rounded-lg border border-neutral-800/60 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:text-white active:scale-[0.97]"
      >
        Delete item
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
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-neutral-800/60 bg-neutral-950 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <AlertTriangle
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close dialog"
                  className="text-neutral-600 transition-colors hover:text-neutral-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h3
                id="confirm-modal-title"
                className="mt-4 text-base font-semibold text-white"
              >
                Confirm deletion
              </h3>
              <p
                id="confirm-modal-description"
                className="mt-2 text-[13px] leading-relaxed text-neutral-500"
              >
                This action cannot be undone. The item will be permanently
                removed from the system.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 rounded-lg border border-neutral-800/60 bg-neutral-900 py-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 rounded-lg bg-red-500/90 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const code = `import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm action",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: ConfirmModalProps) {
  const colors = variant === "danger"
    ? { bg: "bg-red-500/10", icon: "text-red-400", btn: "bg-red-500/90 hover:bg-red-500" }
    : { bg: "bg-amber-500/10", icon: "text-amber-400", btn: "bg-amber-500/90 hover:bg-amber-500" };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center 
            bg-black/60 backdrop-blur-sm"
          onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl border 
              border-neutral-800/60 bg-neutral-950 p-6">
            <div className="flex items-start justify-between">
              <div className={\`flex h-10 w-10 items-center 
                justify-center rounded-lg \${colors.bg}\`}>
                <AlertTriangle className={\`h-5 w-5 \${colors.icon}\`} />
              </div>
              <button onClick={onClose}
                className="text-neutral-600 transition-colors 
                  hover:text-neutral-300">
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              {title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed 
              text-neutral-500">
              {description}
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={onClose}
                className="flex-1 rounded-lg border border-neutral-800/60 
                  bg-neutral-900 py-2 text-sm font-medium 
                  text-neutral-400 transition-colors hover:text-white">
                {cancelLabel}
              </button>
              <button onClick={() => { onConfirm(); onClose(); }}
                className={\`flex-1 rounded-lg py-2 text-sm font-medium 
                  text-white transition-colors \${colors.btn}\`}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`;

export const confirmModal: ComponentEntry = {
  title: "Alert Dialog",
  slug: "confirm-modal",
  description:
    "Confirmation modal with danger/warning variants, backdrop blur, and entrance animation.",
  demo: <ConfirmModalDemo />,
  code,
  props: [
    {
      name: "open",
      type: "boolean",
      description: "Controls whether the modal is visible.",
      required: true,
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback when the modal is closed.",
      required: true,
    },
    {
      name: "onConfirm",
      type: "() => void",
      description: "Callback when the action is confirmed.",
      required: true,
    },
    {
      name: "title",
      type: "string",
      default: '"Confirm action"',
      description: "Modal title.",
    },
    {
      name: "description",
      type: "string",
      default: '"This action cannot be undone."',
      description: "Modal descriptive text.",
    },
    {
      name: "confirmLabel",
      type: "string",
      default: '"Confirm"',
      description: "Confirm button text.",
    },
    {
      name: "cancelLabel",
      type: "string",
      default: '"Cancel"',
      description: "Cancel button text.",
    },
    {
      name: "variant",
      type: '"danger" | "warning"',
      default: '"danger"',
      description: "Visual variant of the modal (icon and button colors).",
    },
  ],
  dependencies: ["framer-motion", "lucide-react"],
  usage: `import { ConfirmModal } from "@/components/ui/confirm-modal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Delete</button>
      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleDelete()}
        title="Confirm deletion"
        variant="danger"
      />
    </>
  );
}`,
};
