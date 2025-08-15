# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pantheons Play is a Next.js 15 application built with TypeScript, React 19, and Tailwind CSS v4. It's a landing page for community gaming events featuring animated UI components and a starfield background.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Type checking (no dedicated script, use directly)
npx tsc --noEmit
```

## Architecture & Key Patterns

### Component Structure
- **UI Components** (`/components/ui/`): shadcn/ui components using Radix UI primitives
- **Feature Components** (`/components/pantheons/`): Business logic components specific to the site
- **Styling**: Tailwind CSS v4 with CSS variables, configured for shadcn/ui New York style
- **Animations**: Framer Motion for complex animations, tw-animate-css for simple ones

### Configuration
- **Site Config** (`/lib/constants.ts`): Centralized configuration for site metadata, event details, navigation items, and image paths
- **Path Aliases**: `@/` maps to project root for clean imports
- **TypeScript**: Strict mode enabled with bundler module resolution

### Key Dependencies
- **Next.js 15**: App router structure with server components by default
- **shadcn/ui**: Component library setup with `components.json` configuration
- **Framer Motion**: Animation library for the starfield and other interactive elements
- **Lucide React**: Icon library

### Project Structure
```
app/            # Next.js app router pages and layouts
components/     
  pantheons/    # Feature-specific components
  ui/           # Reusable UI components (shadcn/ui)
lib/            # Utilities and constants
public/         # Static assets including images
```

## Important Notes
- No test framework currently configured
- Using Tailwind CSS v4 (alpha/beta) with PostCSS
- Components use server components by default unless "use client" is specified
- Font optimization with Geist font family from Google Fonts