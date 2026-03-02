import React from "react";
import { type TocItem } from "@/components/TableOfContents";
import CopyCommand from "@/components/CopyCommand";

export interface GuideEntry {
  title: string;
  slug: string;
  toc: TocItem[];
  content: React.ReactNode;
}

/* ══════════════════════════════════════════
   Introduction
   ══════════════════════════════════════════ */
const introduction: GuideEntry = {
  title: "Introduction",
  slug: "introduction",
  toc: [
    { id: "copy-paste", label: "Copy, paste & customize" },
    { id: "whats-included", label: "What's included" },
    { id: "why-use", label: "Why use it" },
    { id: "tech-stack", label: "Tech stack" },
    { id: "structure", label: "Recommended structure" },
    { id: "design-principles", label: "Design principles" },
    { id: "accessibility", label: "Accessibility" },
    { id: "community", label: "Community & contributing" },
  ],
  content: (
    <article className="max-w-none">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Introduction
      </h1>
      <p className="mt-5 text-[17px] leading-[1.75] text-neutral-500">
        Use Nox UI components to build modern interfaces.
      </p>

      <div className="mt-[60px] space-y-[60px] text-[17px] leading-[1.75] text-neutral-400">
        <p>
          Nox UI is a collection of React components built with Tailwind CSS and
          Framer Motion. The focus is on providing ready-to-use elements you can
          copy and paste into your project, without installing extra packages.
        </p>

        <div>
          <h2
            id="copy-paste"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            Copy, paste & customize.
          </h2>
          <p className="mt-5 text-neutral-500">
            Nox UI is not an NPM library. You copy the component code directly
            into your project and adapt it however you like. No extra
            dependencies, no version lock-in.
          </p>
        </div>

        <div>
          <h2
            id="whats-included"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            {"What's included"}
          </h2>
          <ul className="mt-6 space-y-3 text-neutral-400">
            <li>
              <span className="text-neutral-300">Components</span> — Buttons,
              modals, navbars, forms, and other UI elements ready for use.
            </li>
            <li>
              <span className="text-neutral-300">Animations</span> — Subtle
              Framer Motion transitions on all components, no extra setup
              required.
            </li>
            <li>
              <span className="text-neutral-300">Responsive</span> — All
              components work at any screen size, from mobile to desktop.
            </li>
            <li>
              <span className="text-neutral-300">TypeScript</span> — Full typing
              on all props, with editor autocomplete.
            </li>
          </ul>
        </div>

        <div>
          <h2
            id="why-use"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            Why use it
          </h2>
          <ul className="mt-6 space-y-3 text-neutral-400">
            <li>
              <span className="text-neutral-300">No dependencies</span> — Copy
              only what you need. No packages, no breaking changes.
            </li>
            <li>
              <span className="text-neutral-300">Open source</span> — Direct
              access to the source code to adapt to your design system.
            </li>
            <li>
              <span className="text-neutral-300">Built-in motion</span> —
              Ready-made animations on all components.
            </li>
            <li>
              <span className="text-neutral-300">Minimalist design</span> —
              Clean, dark aesthetic ready for production.
            </li>
            <li>
              <span className="text-neutral-300">Zero config</span> — No themes,
              providers, or wrappers to set up. Just paste and use.
            </li>
          </ul>
        </div>

        <div>
          <h2
            id="tech-stack"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            Tech stack
          </h2>
          <p className="mt-5 text-neutral-400">
            Nox UI components are built with a modern stack widely adopted by
            the React community.
          </p>
          <ul className="mt-6 space-y-3 text-neutral-400">
            <li>
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
              >
                React 19+
              </a>{" "}
              — Compatible with the latest versions, including Server
              Components.
            </li>
            <li>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
              >
                Next.js 15+
              </a>{" "}
              — Optimized for App Router with RSC and streaming support.
            </li>
            <li>
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
              >
                Tailwind CSS v4
              </a>{" "}
              — Utility-first styling with the new native CSS engine.
            </li>
            <li>
              <a
                href="https://www.framer.com/motion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
              >
                Framer Motion
              </a>{" "}
              — Declarative animations with spring physics and layout
              animations.
            </li>
            <li>
              <a
                href="https://www.typescriptlang.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
              >
                TypeScript
              </a>{" "}
              — Strict typing on all interfaces and exported props.
            </li>
          </ul>
        </div>

        <div>
          <h2
            id="structure"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            Recommended structure
          </h2>
          <p className="mt-5 text-neutral-400">
            We recommend organizing copied components in a dedicated folder in
            your project. This makes maintenance easier and avoids conflicts
            with the rest of the codebase.
          </p>
          <div className="mt-6 rounded-xl border border-neutral-700/50 bg-black p-8">
            <pre className="font-mono text-[13px] leading-relaxed text-neutral-400">
              {`src/
  app/
    page.tsx
  components/
    ui/                      Nox UI components
      animated-modal.tsx
      glow-button.tsx
      ...
    shared/                  Global components
  lib/                       Utilities`}
            </pre>
          </div>
          <p className="mt-6 text-neutral-500">
            You can rename, move, or split the files as you see fit. Each
            component is standalone — it does not depend on other library files.
          </p>
        </div>

        <div>
          <h2
            id="design-principles"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            Design principles
          </h2>
          <p className="mt-5 text-neutral-400">
            All components follow a consistent set of principles that guide
            visual and interaction decisions.
          </p>
          <ul className="mt-6 space-y-3 text-neutral-400">
            <li>
              <span className="text-neutral-300">Minimalism</span> — Clean
              interfaces with generous spacing. No visual noise or unnecessary
              decoration.
            </li>
            <li>
              <span className="text-neutral-300">Subtle feedback</span> — Every
              interaction has a visual response: smooth hovers, opacity
              transitions, micro-animations.
            </li>
            <li>
              <span className="text-neutral-300">Consistency</span> — Borders,
              radii, colors, and spacing follow a unified scale across all
              components.
            </li>
            <li>
              <span className="text-neutral-300">Dark-first</span> — The dark
              theme is the default. All components are designed for black or
              very dark backgrounds.
            </li>
          </ul>
        </div>

        <div>
          <h2
            id="accessibility"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            Accessibility
          </h2>
          <p className="mt-5 text-neutral-400">
            Components include semantic and accessibility attributes by default.
            Practices adopted include:
          </p>
          <ul className="mt-6 space-y-3 text-neutral-400">
            <li>
              <span className="text-neutral-300">ARIA labels</span> — Buttons,
              modals, and forms include{" "}
              <code className="rounded bg-neutral-800/80 px-1.5 py-0.5 text-[13px] text-neutral-300">
                aria-label
              </code>{" "}
              and{" "}
              <code className="rounded bg-neutral-800/80 px-1.5 py-0.5 text-[13px] text-neutral-300">
                role
              </code>{" "}
              attributes where appropriate.
            </li>
            <li>
              <span className="text-neutral-300">Visible focus</span> — All
              interactive elements maintain keyboard focus indicators.
            </li>
            <li>
              <span className="text-neutral-300">Contrast</span> — Text and
              interactive elements meet minimum contrast ratios for readability.
            </li>
            <li>
              <span className="text-neutral-300">Keyboard navigation</span> —
              Modals, dropdowns, and forms can be operated entirely via
              keyboard.
            </li>
          </ul>
        </div>

        <div>
          <h2
            id="community"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            Community & contributing
          </h2>
          <p className="mt-5 text-neutral-400">
            Nox UI is an open project. You can contribute new components, report
            bugs, or suggest improvements directly in the repository.
          </p>
          <ul className="mt-6 space-y-3 text-neutral-400">
            <li>
              <span className="text-neutral-300">Repository</span> — The code is
              available on GitHub. Forks and pull requests are welcome.
            </li>
            <li>
              <span className="text-neutral-300">Issues</span> — Found a bug or
              have a suggestion? Open an issue in the repository.
            </li>
            <li>
              <span className="text-neutral-300">New components</span> — Want to
              add a component? Follow the pattern in{" "}
              <code className="rounded bg-neutral-800/80 px-1.5 py-0.5 text-[13px] text-neutral-300">
                src/registry/components/
              </code>{" "}
              and submit a PR.
            </li>
          </ul>
        </div>
      </div>
    </article>
  ),
};

/* ══════════════════════════════════════════
   Installation
   ══════════════════════════════════════════ */
const installation: GuideEntry = {
  title: "Installation",
  slug: "installation",
  toc: [
    { id: "create-project", label: "Create a Next.js project" },
    { id: "dependencies", label: "Install dependencies" },
    { id: "copy-components", label: "Copy the components" },
    { id: "use-in-code", label: "Use in your code" },
    { id: "requirements", label: "Requirements" },
  ],
  content: (
    <article className="max-w-none">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Installation
      </h1>
      <p className="mt-5 text-[17px] leading-[1.75] text-neutral-500">
        Set up your project to use Nox UI components.
      </p>

      <div className="mt-[60px] space-y-[60px] text-[17px] leading-[1.75] text-neutral-400">
        <div>
          <h2
            id="create-project"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            1. Create a Next.js project
          </h2>
          <p className="mt-3 text-neutral-500">
            The components are optimized for Next.js with App Router and
            Tailwind CSS v4.
          </p>
          <CopyCommand command="npx create-next-app@latest my-app --typescript --tailwind --app --eslint" />
        </div>

        <div>
          <h2
            id="dependencies"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            2. Install dependencies
          </h2>
          <p className="mt-3 text-neutral-500">
            Framer Motion for animations and Lucide for icons.
          </p>
          <CopyCommand command="npm install framer-motion lucide-react" />
        </div>

        <div>
          <h2
            id="copy-components"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            3. Copy the components
          </h2>
          <p className="mt-3 text-neutral-500">
            Browse the components, preview them, and copy the code into your
            project. We recommend using a{" "}
            <code className="rounded bg-neutral-800/80 px-1.5 py-0.5 text-[13px] text-neutral-300">
              src/components/ui/
            </code>{" "}
            folder for organization.
          </p>
        </div>

        <div>
          <h2
            id="use-in-code"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            4. Use in your code
          </h2>
          <p className="mt-3 text-neutral-500">
            Import and use the copied component:
          </p>
          <CopyCommand
            command={`import { GlowButton } from "@/components/ui/glow-button";

export default function Page() {
  return <GlowButton>Get Started</GlowButton>;
}`}
          />
        </div>

        <div className="rounded-lg border border-neutral-800/60 p-9">
          <h2
            id="requirements"
            className="scroll-mt-20 text-lg font-medium text-white"
          >
            Requirements
          </h2>
          <ul className="mt-5 space-y-[9px] text-neutral-500">
            <li>Next.js 14+ (App Router)</li>
            <li>React 18+</li>
            <li>Tailwind CSS v4</li>
            <li>Framer Motion 11+</li>
            <li>TypeScript (recommended)</li>
          </ul>
        </div>
      </div>
    </article>
  ),
};

/* ── Export all guides ── */
export const guideEntries: GuideEntry[] = [introduction, installation];

export const guideMap: Record<string, GuideEntry> = Object.fromEntries(
  guideEntries.map((g) => [g.slug, g]),
);

export const guideSlugs = new Set(guideEntries.map((g) => g.slug));
