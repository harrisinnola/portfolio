# Deployment Guide

How to get your portfolio live on the internet at mikeharris.design.

---

## Prerequisites

- A [GitHub](https://github.com) account (free)
- A [Vercel](https://vercel.com) account (free — sign up with your GitHub account)
- Access to your domain registrar (wherever you purchased mikeharris.design)

---

## Step 1: Test the Production Build Locally

Before deploying, make sure the production build works:

```sh
npm run build     # Compiles the site into dist/
npm run preview   # Serves the built site at localhost:4321
```

Open [localhost:4321](http://localhost:4321) and click through every page. The production build is stricter than the dev server — this catches issues before they go live.

---

## Step 2: Push to GitHub

Initialize a git repository and push your code:

```sh
# From the portfolio directory
git init
git add -A
git commit -m "Initial commit: portfolio site"
```

Then create a new repository on [github.com/new](https://github.com/new):
- Repository name: `portfolio` (or whatever you prefer)
- Keep it public or private — Vercel works with both
- Don't add a README (you already have one)

After creating the repo, connect and push:

```sh
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Find your `portfolio` repository and click **Import**
4. Vercel auto-detects Astro — the settings should be:
   - Framework Preset: **Astro**
   - Build Command: `astro build`
   - Output Directory: `dist`
5. Click **Deploy**
6. Wait 1-2 minutes

Vercel gives you a live URL like `portfolio-abc123.vercel.app`. Visit it to confirm everything works.

---

## Step 4: Connect Your Custom Domain

1. In the Vercel dashboard, go to your project
2. Click **Settings** > **Domains**
3. Type `mikeharris.design` and click **Add**
4. Vercel shows the DNS records you need to set

### DNS Records to Add

Go to your domain registrar (wherever you purchased mikeharris.design) and add these records:

**For the main domain (mikeharris.design):**

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |

**For the www subdomain (www.mikeharris.design):**

| Type | Name | Value |
|------|------|-------|
| CNAME | www | `cname.vercel-dns.com` |

### DNS Propagation

After adding the records, it takes **5-30 minutes** for the change to take effect (sometimes up to 48 hours, but usually fast). Vercel will automatically:
- Detect the DNS change
- Provision a free SSL certificate (HTTPS)
- Start serving your site at mikeharris.design

---

## Step 5: Migrating from Wix

Your domain currently points to Wix. Here's the safe migration order:

1. **Deploy to Vercel first** and confirm the site works at the `.vercel.app` URL
2. **Update DNS records** at your registrar to point to Vercel (Step 4 above)
3. The Wix site will go offline once DNS switches over

**Important:** There may be a brief period (minutes to hours) where the domain shows an error page while DNS propagates. Plan the switch for a low-traffic time.

**Tip:** If your domain is registered through Wix, you may need to transfer it to another registrar (like Cloudflare, Namecheap, or Google Domains) to change DNS records freely. Check your Wix domain settings first.

---

## Continuous Deployment

After initial setup, your workflow is:

```sh
# 1. Make changes locally
# 2. Stage and commit
git add -A
git commit -m "Update project descriptions"

# 3. Push to GitHub
git push
```

That's it. Every push to `main` triggers Vercel to automatically rebuild and deploy your site (~30 seconds).

Pushes to other branches create **preview deployments** — separate URLs where you can test changes before merging to main.

---

## Alternatives to Vercel

If you prefer a different host, these all work with Astro:

| Platform | Free tier | Setup |
|----------|-----------|-------|
| [Netlify](https://netlify.com) | Yes | Very similar to Vercel — connect GitHub, auto-detects Astro |
| [Cloudflare Pages](https://pages.cloudflare.com) | Yes | Fast global CDN, also auto-detects Astro |
| [GitHub Pages](https://pages.github.com) | Yes | Requires a GitHub Actions workflow file |

The Astro docs have guides for each: [docs.astro.build/en/guides/deploy](https://docs.astro.build/en/guides/deploy/)
