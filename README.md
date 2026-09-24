# Aziz Baratov — Portfolio

Personal portfolio for Aziz Baratov, Senior Product Designer based in Berlin.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- CSS animations and responsive layouts

## Local development

Requirements: Node.js 22+ and pnpm 10+.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
pnpm dev      # Start the development server
pnpm lint     # Run ESLint
pnpm test     # Run repository tests
pnpm build    # Create a production build
pnpm check    # Run lint, tests, and build
```

## Project structure

```text
app/                         Routes and route-specific components
  _components/               Components shared by portfolio pages
  projects/kaspi-home/       Kaspi.kz Home case study
content/                     Projects, experience, and social data
public/
  fonts/                     Local font files
  icons/                     Interface icons
  images/projects/           Project cover images
  images/social/             Social folder artwork
styles/                      Global portfolio and case-study styles
tests/                       Structural tests
.github/workflows/           Continuous integration
```

## Routes

- `/` — portfolio home
- `/projects/kaspi-home` — Kaspi.kz Home case study

## Deployment

The project uses the standard Next.js runtime and can be deployed to any platform that supports Next.js or a Node.js server.
