import {
  MousePointerClick,
  Loader2,
  Navigation,
  FormInput,
  Layers,
  ChevronsUpDown,
  GalleryHorizontalEnd,
  Timer,
  LayoutGrid,
  Type,
} from "lucide-react";
import { type SidebarCategory } from "@/components/Sidebar";
import { glowButton } from "./components/glow-button";
import { statefulButton } from "./components/stateful-button";
import { loader } from "./components/loader";
import { floatingNavbar } from "./components/floating-navbar";
import { signupForm } from "./components/signup-form";
import { animatedModal } from "./components/animated-modal";
import { accordion } from "./components/accordion";
import { carousel } from "./components/carousel";
import { countdown } from "./components/countdown";
import { bentoGrid } from "./components/bento-grid";
import { confirmModal } from "./components/confirm-modal";
import { gradientText } from "./components/gradient-text";
import { typewriterText } from "./components/typewriter-text";
import { glitchText } from "./components/glitch-text";
import { blurReveal } from "./components/blur-reveal";
import { type ComponentEntry } from "./types";

/* ── All registered components ── */
const allComponents: ComponentEntry[] = [
  glowButton,
  statefulButton,
  loader,
  floatingNavbar,
  signupForm,
  animatedModal,
  accordion,
  carousel,
  countdown,
  bentoGrid,
  confirmModal,
  gradientText,
  typewriterText,
  glitchText,
  blurReveal,
];

/* ── Static list of component slugs for SSG ── */
export const componentSlugs: string[] = [
  "glow-button",
  "stateful-button",
  "loader",
  "floating-navbar",
  "signup-form",
  "animated-modal",
  "accordion",
  "carousel",
  "countdown",
  "bento-grid",
  "confirm-modal",
  "gradient-text",
  "typewriter-text",
  "glitch-text",
  "blur-reveal",
];

/* ── Lookup map by slug ── */
export const componentMap: Record<string, ComponentEntry> = Object.fromEntries(
  allComponents.filter((c) => c && c.slug).map((c) => [c.slug, c])
);

/* ── Sidebar categories ── */
export const sidebarCategories: SidebarCategory[] = [
  {
    icon: <MousePointerClick className="h-4 w-4" />,
    title: "Buttons",
    items: [
      { name: "Aurora Button", slug: "glow-button" },
      { name: "Flux Toggle", slug: "stateful-button" },
    ],
  },
  {
    icon: <ChevronsUpDown className="h-4 w-4" />,
    title: "Accordions",
    items: [{ name: "Stack Reveal", slug: "accordion" }],
  },
  {
    icon: <GalleryHorizontalEnd className="h-4 w-4" />,
    title: "Carousels",
    items: [{ name: "Slide Drift", slug: "carousel" }],
  },
  {
    icon: <Timer className="h-4 w-4" />,
    title: "Countdown",
    items: [{ name: "Flip Clock", slug: "countdown" }],
  },
  {
    icon: <LayoutGrid className="h-4 w-4" />,
    title: "Grids",
    items: [{ name: "Mosaic Grid", slug: "bento-grid" }],
  },
  {
    icon: <Loader2 className="h-4 w-4" />,
    title: "Loaders",
    items: [{ name: "Orbit Spinner", slug: "loader" }],
  },
  {
    icon: <Navigation className="h-4 w-4" />,
    title: "Navigation",
    items: [{ name: "Float Dock", slug: "floating-navbar" }],
  },
  {
    icon: <FormInput className="h-4 w-4" />,
    title: "Inputs & Forms",
    items: [{ name: "Gateway Form", slug: "signup-form" }],
  },
  {
    icon: <Layers className="h-4 w-4" />,
    title: "Overlays & Modals",
    items: [
      { name: "Spotlight Dialog", slug: "animated-modal" },
      { name: "Alert Dialog", slug: "confirm-modal" },
    ],
  },
  {
    icon: <Type className="h-4 w-4" />,
    title: "Text & Typography",
    items: [
      { name: "Gradient Flow", slug: "gradient-text" },
      { name: "Typewriter", slug: "typewriter-text" },
      { name: "Glitch Text", slug: "glitch-text" },
      { name: "Blur Reveal", slug: "blur-reveal" },
    ],
  },
];

export type { ComponentEntry } from "./types";
export { guideEntries, guideMap, guideSlugs } from "./guides";
export type { GuideEntry } from "./guides";
