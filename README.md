# Natpu Futuristic 3D Portfolio

A cinematic React and TypeScript developer portfolio for Natpu, built with React Three Fiber, Three.js, Framer Motion, GSAP ScrollTrigger, Tailwind CSS, and a live GitHub repository feed.

## Features

- Full-screen animated Three.js background with particles, grids, waves, floating objects, and holographic lighting.
- 3D hero profile scene with a futuristic desktop environment and animated Natpu identity.
- Apple-style project showcase with scroll-triggered depth, rotation, scale, and blur transitions.
- GitHub API integration for live project cards, repository links, topics, languages, and preview images.
- Animated 3D skills for React, TypeScript, Figma, Tailwind CSS, C#, and SQL Server.
- About, Skills, Projects, Experience, and Contact sections with responsive glassmorphism UI.
- SEO metadata, structured data, and Vercel deployment config.

## Quick Start

```bash
npm install
npm run dev
```

## GitHub Sync

Create a `.env` file in the project root:

```bash
VITE_GITHUB_USERNAME=Pradeep479182
VITE_GITHUB_TOKEN=your_optional_github_token
```

`VITE_GITHUB_TOKEN` is optional, but recommended in production to improve GitHub API rate limits.

## Build

```bash
npm run build
```

## Vercel Deployment

Connect this GitHub repository to Vercel and use:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `VITE_GITHUB_USERNAME`, optional `VITE_GITHUB_TOKEN`

The included `vercel.json` supports Vite routing and GitHub auto deployment from Vercel.
