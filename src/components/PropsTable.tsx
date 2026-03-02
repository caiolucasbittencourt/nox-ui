"use client";

import React from "react";

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  title?: string;
  props: PropDefinition[];
}

export default function PropsTable({ title, props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <div className="w-full">
      {title && (
        <h3 className="mb-3 text-[15px] font-semibold text-white">{title}</h3>
      )}
      <div className="overflow-hidden rounded-xl border border-neutral-700/50 bg-black">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-700/50 bg-black">
              <th className="px-4 py-3 text-xs font-medium text-neutral-400">
                Prop
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-400">
                Type
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-400">
                Default
              </th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-400">
                Description
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-neutral-400">
                Required
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700/50">
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3">
                  <code className="rounded bg-neutral-800/60 px-1.5 py-0.5 text-[12px] text-neutral-300">
                    {prop.name}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="rounded bg-neutral-800/60 px-1.5 py-0.5 text-[12px] text-neutral-300">
                    {prop.type}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {prop.default ? (
                    <code className="rounded bg-neutral-800/60 px-1.5 py-0.5 text-[12px] text-neutral-300">
                      {prop.default}
                    </code>
                  ) : (
                    <span className="text-neutral-600">–</span>
                  )}
                </td>
                <td className="px-4 py-3 text-[13px] text-neutral-400">
                  {prop.description}
                </td>
                <td className="px-4 py-3 text-center text-[13px] text-neutral-500">
                  {prop.required ? (
                    <span className="text-white">Yes</span>
                  ) : (
                    "No"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
