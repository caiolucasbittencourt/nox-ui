# Contributing to Nox UI

Thank you for your interest in contributing to Nox UI! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/caiolucasbittencourt/nox-ui/issues)
2. If not, create a new issue with:
   - A clear, descriptive title
   - Steps to reproduce the bug
   - Expected vs actual behavior
   - Browser/OS information if relevant

### Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue with the "feature request" label
3. Describe the feature and its use case

### Contributing Code

#### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/caiolucasbittencourt/nox-ui.git
   cd nox-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Adding a New Component

1. Create a new file in `src/registry/components/`:

   ```
   src/registry/components/your-component.tsx
   ```

2. Follow the existing component structure:

   ```tsx
   "use client";

   import React from "react";
   import { type ComponentEntry } from "../types";

   function YourComponentDemo() {
     // Demo implementation
     return <div>...</div>;
   }

   const code = `// The code users will copy
   export function YourComponent() {
     return <div>...</div>;
   }`;

   export const yourComponent: ComponentEntry = {
     title: "Your Component",
     slug: "your-component",
     description: "Brief description of what the component does.",
     demo: <YourComponentDemo />,
     code,
     props: [
       // Only list props that actually exist in the code
     ],
     dependencies: [
       // Only list dependencies actually used
     ],
     usage: `// Example usage code`,
   };
   ```

3. Register the component in `src/registry/index.tsx`:
   - Import the component
   - Add to `allComponents` array
   - Add to appropriate `sidebarCategories` section

#### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing code formatting (2-space indentation)
- Use Tailwind CSS for styling
- Ensure components work in dark mode
- Add proper TypeScript types for all props
- Keep components simple and focused

#### Component Guidelines

- **Props must match documentation**: Only document props that actually exist in the code
- **Dependencies must be accurate**: Only list dependencies that are actually used
- **Code must match demo**: The `code` string should produce the same result as the demo
- **Accessibility**: Add proper ARIA attributes, keyboard navigation, and focus management

#### Commit Messages

Use clear, descriptive commit messages:

```
feat: add new Tooltip component
fix: correct animation timing in Modal
docs: update installation instructions
refactor: simplify Accordion logic
```

### Pull Request Process

1. Ensure your code follows the style guidelines
2. Update documentation if needed
3. Test your changes locally
4. Create a pull request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/GIFs for visual changes

## Development Commands

```bash
# Start development server
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build
```

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for helping make Nox UI better! 🚀
