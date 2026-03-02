import React from "react";
import { type PropDefinition } from "@/components/PropsTable";

export interface ComponentEntry {
  title: string;
  slug: string;
  description: string;
  demo: React.ReactNode;
  code: string;
  props: PropDefinition[];
  dependencies?: string[];
  usage?: string;
}
