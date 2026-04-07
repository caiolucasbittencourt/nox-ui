# Nox UI

A copy-and-paste UI component collection for React. Built with Tailwind CSS and Framer Motion, focused on dark mode and modern aesthetics.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## Features

- **Copy & Paste** — No npm install. Copy the component code directly into your project.
- **Dark Mode First** — All components designed for dark interfaces.
- **Animations** — Smooth Framer Motion transitions on every component.
- **TypeScript** — Full typing on all props with autocomplete.
- **Zero Config** — No themes, providers, or wrappers to set up.

## Components

| Category   | Components                                          |
| ---------- | --------------------------------------------------- |
| Buttons    | Aurora Button, Flux Toggle                          |
| Accordions | Stack Reveal                                        |
| Carousels  | Slide Drift                                         |
| Countdown  | Flip Clock                                          |
| Grids      | Mosaic Grid                                         |
| Loaders    | Orbit Spinner                                       |
| Navigation | Float Dock                                          |
| Forms      | Gateway Form                                        |
| Modals     | Spotlight Dialog, Alert Dialog                      |
| Typography | Gradient Flow, Typewriter, Glitch Text, Blur Reveal |

## Getting Started

### Prerequisites

- Node.js 22+
- React 19+
- Tailwind CSS 4+
- (Optional) Framer Motion for animated components

### Installation

1. Clone the repository:

```bash
git clone https://github.com/caiolucasbittencourt/nox-ui.git
cd nox-ui
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to browse the components.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run typecheck    # Run TypeScript type checking
npm run check        # Run all checks (typecheck + lint + format)
```

### Using Components

1. Browse to a component in the documentation
2. Click "Code" to view the source
3. Copy the code into your project (e.g., `components/ui/glow-button.tsx`)
4. Import and use it:

```tsx
import { GlowButton } from "@/components/ui/glow-button";

export default function Page() {
  return <GlowButton>Get Started</GlowButton>;
}
```

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router with React Server Components
- [React 19](https://react.dev) — Latest React features
- [Tailwind CSS 4](https://tailwindcss.com) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [Lucide React](https://lucide.dev) — Icon library
- [TypeScript](https://www.typescriptlang.org/) — Type safety

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── docs/
│   │   └── [slug]/        # Dynamic documentation pages
│   └── layout.tsx
├── components/            # Documentation site components
│   ├── CodeBlock.tsx
│   ├── ComponentViewer.tsx
│   ├── Navbar.tsx
│   ├── PropsTable.tsx
│   └── Sidebar.tsx
└── registry/              # Component registry
    ├── components/        # All UI components
    ├── guides.tsx         # Documentation guides
    ├── index.tsx          # Registry exports
    └── types.ts           # TypeScript types
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
