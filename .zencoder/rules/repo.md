---
description: Repository Information Overview
alwaysApply: true
---

# Next-JS-Demo-Projet Information

## Summary
A Next.js application called "TransitPass" that appears to be a digital bus pass solution. The project uses modern React with TypeScript and includes AI integration via Google's Gemini model.

## Structure
- **src/app**: Next.js application routes and pages
- **src/components**: UI components organized by feature (auth, dashboard, data-table, ui)
- **src/ai**: AI integration with Google's Gemini model
- **src/hooks**: Custom React hooks
- **src/lib**: Utility functions and shared code
- **src/types**: TypeScript type definitions
- **public**: Static assets including images
- **docs**: Project documentation

## Language & Runtime
**Language**: TypeScript
**Version**: ES2017 target with TypeScript 5
**Framework**: Next.js 15.3.3
**Build System**: Next.js with Turbopack
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- **Next.js**: React framework (v15.3.3)
- **React**: UI library (v18.3.1)
- **TailwindCSS**: Utility-first CSS framework (v3.4.1)
- **Radix UI**: Headless component library (various components)
- **Tanstack React Query**: Data fetching library (v5.51.1)
- **Genkit/Google AI**: AI integration with Gemini model (v1.14.1)
- **React Hook Form**: Form handling (v7.54.2)
- **Zod/Yup**: Schema validation libraries

**Development Dependencies**:
- TypeScript (v5)
- PostCSS
- TailwindCSS
- Genkit CLI

## Build & Installation
```bash
# Install dependencies
npm install

# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint

# AI development
npm run genkit:dev
npm run genkit:watch
```

## Firebase Integration
The project includes Firebase App Hosting configuration with a maximum of 1 instance specified in `apphosting.yaml`.

## UI Components
The project uses Shadcn UI components (configured in components.json) with Tailwind CSS for styling. The UI follows a component-based architecture with theme support (light/dark mode).

## AI Integration
The application integrates with Google's Gemini 2.0 Flash model using the Genkit library, allowing for AI-powered features within the application.

## Main Entry Points
- **src/app/layout.tsx**: Root layout component
- **src/app/page.tsx**: Main landing page
- **src/app/providers.tsx**: Application providers
- **src/ai/genkit.ts**: AI integration configuration