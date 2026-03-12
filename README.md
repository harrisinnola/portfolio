# mikeharris.design

Personal portfolio and interactive experiments. Built with [Astro](https://astro.build), plain CSS, and vanilla JavaScript.

## Quick Start

```sh
npm install
npm run dev
```

Open [localhost:4321](http://localhost:4321) in your browser.

## Project Structure

```
src/
  components/   Reusable UI pieces (Navigation, ProjectCard, etc.)
  data/         Content data files (projects.js)
  layouts/      Page wrapper (BaseLayout.astro)
  pages/        Routes — each .astro file becomes a URL
    experiments/ Interactive experiments
  styles/       Global CSS (variables, reset, typography)
public/
  images/       Static images (project thumbnails)
  resume.pdf    Downloadable resume
  favicon.svg   Site icon
```

## Adding a New Project

1. Open `src/data/projects.js`
2. Add a new object to the array:
   ```js
   {
     title: 'My New Project',
     description: 'A short summary.',
     image: '/images/projects/my-project.svg',
     tags: ['Design', 'Web'],
     url: 'https://example.com',
   }
   ```
3. Put the thumbnail image in `public/images/projects/`
4. Done — the `/work` page updates automatically

## Adding a New Experiment

1. Create a new page at `src/pages/experiments/my-experiment.astro`
2. Use `BaseLayout` for the page wrapper
3. Add interactive code in a `<script>` tag (runs in the browser)
4. Add a card entry in the `experiments` array in `src/pages/experiments/index.astro`

## Available Commands

| Command             | What it does                                      |
| :------------------ | :------------------------------------------------ |
| `npm run dev`       | Start dev server at `localhost:4321` (auto-reload) |
| `npm run build`     | Build production site to `dist/`                  |
| `npm run preview`   | Preview the production build locally              |

## Tech Stack

- **Astro** — Static site generator (compiles `.astro` files to HTML)
- **Plain CSS** — No Tailwind, no preprocessors. CSS custom properties for theming.
- **Vanilla JS** — No React, no frameworks. Used only in experiments for interactivity.
- **Vercel** — Hosting and deployment (see DEPLOY.md)
