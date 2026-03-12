# Learning Guide

This document explains every major concept used in this project. Each section maps to something you can find in the code. Read a section, then open the corresponding file to see it in action.

---

## How Astro Works

**File:** `astro.config.mjs`

Astro is a **static site generator**. You write `.astro` files mixing HTML with JavaScript, and Astro compiles them into plain HTML at build time. The key insight: **no JavaScript ships to the browser** unless you explicitly add a `<script>` tag.

This is different from React or Vue, where the framework's JavaScript runs in the browser on every page load. With Astro, your visitors get pure HTML and CSS — fast, lightweight, and accessible by default.

**The build process:**

```
src/pages/work.astro  →  (npm run build)  →  dist/work/index.html
```

Run `npm run build` and look inside `dist/` — you'll see plain HTML files. That's what gets deployed.

---

## File-Based Routing

**Files:** `src/pages/*.astro`

Every `.astro` file in `src/pages/` automatically becomes a URL:

```
src/pages/index.astro     →  /
src/pages/work.astro      →  /work
src/pages/about.astro     →  /about
src/pages/experiments/index.astro → /experiments
src/pages/experiments/scale.astro → /experiments/scale
src/pages/404.astro        → (shown for any URL that doesn't match)
```

The filename `index` is special — it represents the "root" of that directory. `pages/experiments/index.astro` becomes `/experiments`, not `/experiments/index`.

No router configuration needed. Add a file, get a route.

---

## Layouts and the Slot Pattern

**File:** `src/layouts/BaseLayout.astro`

A layout is a "picture frame" that wraps every page. It contains the parts that stay the same: the `<head>`, navigation, and footer. The `<slot />` tag marks where the page-specific content goes.

```astro
<!-- In BaseLayout.astro -->
<body>
  <Navigation />
  <main>
    <slot />     <!-- Page content appears here -->
  </main>
  <Footer />
</body>
```

```astro
<!-- In about.astro -->
<BaseLayout title="About" description="...">
  <h1>About</h1>        <!-- This goes into the <slot /> -->
  <p>Content here</p>
</BaseLayout>
```

Without layouts, you'd copy-paste the nav and footer into every page. Layouts keep it DRY (Don't Repeat Yourself).

---

## Components and Props

**Files:** `src/components/*.astro`

Components are reusable building blocks. `Navigation.astro` is written once and appears on every page (via the layout). `ProjectCard.astro` is written once and rendered for each project.

**Props** are data passed from parent to child:

```astro
<!-- Parent (work.astro) passes data down: -->
<ProjectCard title="My Project" description="..." />

<!-- Child (ProjectCard.astro) receives it: -->
const { title, description } = Astro.props;
```

Data flows one direction: parent to child. The child doesn't know or care which page is using it.

---

## Data-Driven Rendering

**File:** `src/data/projects.js`, `src/pages/work.astro`

Instead of writing HTML for each project card by hand, we:

1. Store project data in a JavaScript array (`projects.js`)
2. Import the array in the page
3. Use `.map()` to render a component for each item

```astro
{projects.map(p => <ProjectCard title={p.title} ... />)}
```

This is powerful because:
- Adding a project = adding one object to an array (no HTML editing)
- The template and the data are separate concerns
- You could eventually load data from an API or CMS with the same pattern

---

## CSS in Astro

**Files:** `src/styles/global.css`, any `<style>` block in a component

Astro supports two kinds of CSS:

1. **Global CSS** — Imported in the layout, applies everywhere. Used for resets, typography, and CSS custom properties (variables).

2. **Scoped CSS** — Written inside a `<style>` tag in a component. Only affects HTML in that component. Astro automatically adds unique class names to prevent conflicts.

```astro
<!-- In ProjectCard.astro -->
<style>
  /* This .title only affects ProjectCard, even if other
     components also have a .title class */
  .title { font-size: 1.125rem; }
</style>
```

**CSS Custom Properties** (variables) are defined in `global.css` on `:root`:

```css
:root {
  --color-accent: #2563eb;
}

/* Used anywhere: */
a { color: var(--color-accent); }
```

Change the variable in one place, and every element using it updates.

---

## Accessibility Basics

**Files:** `src/components/SkipLink.astro`, `src/components/Navigation.astro`, `src/styles/global.css`

Accessibility (a11y) means making your site usable by everyone, including:
- People using screen readers (visual impairments)
- People navigating with keyboard only (motor impairments)
- People with cognitive differences

What we do in this project:

| Feature | Where | Why |
|---------|-------|-----|
| Skip link | `SkipLink.astro` | Lets keyboard users jump past navigation |
| `aria-current="page"` | `Navigation.astro` | Tells screen readers which nav link is the current page |
| `aria-label` on `<nav>` | `Navigation.astro` | Labels the navigation for screen readers |
| Heading hierarchy | Every page | `<h1>` then `<h2>`, never skipping levels — screen readers use this to build an outline |
| `:focus-visible` | `global.css` | Shows focus outlines for keyboard users, hides them for mouse users |
| `alt=""` on decorative images | `ProjectCard.astro` | Tells screen readers to skip decorative images |
| `lang="en"` on `<html>` | `BaseLayout.astro` | Helps screen readers choose the correct pronunciation |

---

## SEO Fundamentals

**File:** `src/components/Head.astro`

SEO (Search Engine Optimization) helps search engines understand your pages.

The two most important tags:

```html
<title>Work | Mike Harris</title>
<meta name="description" content="Selected projects by Mike Harris." />
```

- **`<title>`** — Shown in the browser tab and in search results as the clickable headline
- **`<meta description>`** — Shown in search results below the title

Every page needs a **unique** title and description. If they're all the same, search engines can't tell your pages apart.

---

## Client-Side JavaScript in Astro

**File:** `src/pages/experiments/scale.astro`

This is the most important distinction in Astro:

| Code location | When it runs | Where it runs | Does the visitor see it? |
|--------------|-------------|---------------|------------------------|
| Between `---` fences | At build time | Your computer (or build server) | No — it's gone |
| Inside `<script>` tags | On page load | Visitor's browser | Yes — it's interactive |

```astro
---
// BUILD TIME: This runs once, when you build the site.
// It fetches data, imports components, prepares variables.
// The visitor never sees this code.
const title = "Scale of Things";
---

<h1>{title}</h1>

<script>
  // BROWSER TIME: This runs every time someone visits the page.
  // It can respond to clicks, animate things, read sensors, etc.
  canvas.addEventListener('wheel', handleZoom);
</script>
```

Most of the portfolio is **static** — no `<script>` tags, no JS in the browser. The experiments are the exception because they need interactivity (canvas animation, scroll handling).

---

## HTML Canvas Basics

**File:** `src/pages/experiments/scale.astro`

A `<canvas>` is a drawable rectangle in the browser. Unlike HTML elements, canvas content is pixel-based — you draw shapes by calling methods on a "2D context":

```js
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

// Draw a blue circle
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);  // x, y, radius, startAngle, endAngle
ctx.fillStyle = '#2563eb';
ctx.fill();

// Draw text
ctx.font = '16px system-ui';
ctx.fillText('Hello', 100, 200);
```

**Animation** uses `requestAnimationFrame`, which tells the browser "call this function before the next screen repaint":

```js
function draw() {
  ctx.clearRect(0, 0, width, height);  // Erase everything
  // ... draw the current frame ...
  requestAnimationFrame(draw);          // Schedule the next frame
}
draw();  // Start the loop
```

This runs ~60 times per second, creating smooth animation.

---

## Further Reading

- [Astro Documentation](https://docs.astro.build) — The official guide
- [MDN Web Docs](https://developer.mozilla.org) — The reference for HTML, CSS, and JavaScript
- [web.dev Learn Accessibility](https://web.dev/learn/accessibility/) — Google's accessibility guide
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) — MDN's canvas tutorial
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) — MDN's guide to CSS variables
