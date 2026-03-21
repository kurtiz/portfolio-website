---
title: "How I Built My Portfolio Website"
date: "2026-03-21"
tags: ["portfolio", "tanstack", "web development", "cloudflare"]
excerpt: "A deep dive into building a modern portfolio website with TanStack Start, Tailwind CSS, and deploying to Cloudflare Workers."
coverImage: "/blog/portfolio.png"
published: true
---

## Why I Built This

I wanted a portfolio that felt different from the typical developer sites. Not just a list of projects and a contact form - but something that actually showcases who I am as a developer.

## The Tech Stack

I chose **TanStack Start** because it gives me the flexibility of a full-stack framework without the overhead. Combined with **Tailwind CSS v4** and **Framer Motion**, I could build something that's both fast and visually engaging.

### Key Decisions

- **TanStack Start** for routing and server-side rendering
- **Cloudflare Workers** for deployment - global edge, no cold starts
- **Tailwind CSS v4** for styling with a custom theme
- **Framer Motion** for smooth animations
- **Content Collections** for this blog (you're reading it right now!)

## The Architecture

```
src/
  routes/          # File-based routing (TanStack)
  components/      # Reusable UI components
  data/            # Static data (projects, experience)
  lib/             # Utilities (SEO, markdown, etc.)
content/
  blog/            # Blog posts (Markdown files)
```

## Lessons Learned

1. **Content Collections** makes managing blog posts trivial - just drop `.md` files
2. **TanStack Start** is still young but very powerful for this use case
3. **Cloudflare Workers** is surprisingly easy to deploy to with `wrangler`

## What's Next

I'm planning to add more interactive elements - maybe a terminal that actually runs commands, and deeper integrations with my open source projects at **OSSAfrica**.

Stay tuned!
