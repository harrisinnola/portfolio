# CLAUDE.md

## Project Overview

Personal portfolio site for mikeharris.design. Built with Astro, plain CSS, and vanilla JS.

## Key Conventions

- No frameworks beyond Astro. Plain CSS (no Tailwind). Vanilla JS (no React).
- Project data lives in `src/data/projects.js`. Add new projects there.
- All pages use `BaseLayout` from `src/layouts/BaseLayout.astro`.
- CSS uses custom properties defined in `src/styles/global.css`.
- Experiments use `<script>` tags for client-side interactivity.
- Accessibility: skip link, `aria-current`, heading hierarchy, `:focus-visible`.

## Commands

- `npm run dev` — dev server on port 4321
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build

## File Structure

```
src/pages/        Routes (file-based routing)
src/layouts/      BaseLayout page wrapper
src/components/   Reusable UI (Navigation, Footer, ProjectCard, ExperimentCard)
src/data/         Content data (projects.js)
src/styles/       Global CSS (reset, variables, typography)
public/           Static assets (images, resume.pdf, favicon)
```

## Adding Content

**New project:** Add an object to `src/data/projects.js`, put image in `public/images/projects/`.

**New experiment:** Create `src/pages/experiments/<name>.astro`, add card to experiments array in `src/pages/experiments/index.astro`.

**New page:** Create `src/pages/<name>.astro`, import BaseLayout, pass title and description props.
