---
title: "How I Built My Portfolio Website"
date: "2026-03-21"
tags: ["portfolio", "tanstack", "web development", "cloudflare", "neumorphism"]
excerpt: "From PHP to Neumorphism to TanStack Start. Four iterations of building my developer portfolio and what each one taught me."
coverImage: "https://assets.iamaaronwilldjaba.me/blog/portfolio.png"
published: true
sortOrder: 0
---

## The Beginning

Building a portfolio website is one of those things every developer eventually has to do. It sounds simple, but getting it right is harder than it looks. You are not just showcasing projects. You are trying to show who you are as a developer, what you care about, and what you can build.

My portfolio has gone through four iterations over the years. Each one taught me something different about design, technology, and what I actually want to say.

## Iteration One: PHP + CodeIgniter + Bootstrap

The first version was simple. PHP, CodeIgniter, and Bootstrap. At the time, this was a solid choice. CodeIgniter was straightforward, Bootstrap handled the styling without much effort, and the site did its job.

I used it for a few years. It showed my projects, linked to my socials, and that was about it. No animations, no complex layouts. Just a basic website that worked.

It served its purpose, but I eventually felt like it was time for something better. I had grown as a developer, and my portfolio should reflect that.

## Iteration Two: The Search for Something Modern

The second iteration was my first real attempt at modern web development. I moved away from PHP and explored JavaScript frameworks. I tried React with React Router and added Framer Motion for animations. I even experimented with Next.js for a bit.

I wanted the site to feel dynamic and polished. But no matter what I tried, something always felt off. The layouts were either too generic or the animations felt gimmicky. I would spend days building something, look at it, and feel like it still did not represent me.

This phase taught me that technology alone does not make a good portfolio. The design needs a direction. Without a clear vision, adding more tools just creates noise.

## Iteration Three: Neumorphism

Then I saw a post on Twitter. Someone had shared a design in the neumorphism style. Soft shadows, subtle depth, muted colors that felt tactile and modern at the same time. I had never seen it applied to a developer portfolio before.

I was hooked.

I spent the next few weeks rebuilding everything with neumorphism in mind. This was the first time I had a clear design direction. Everything else followed from that. The color palette, the shadows, the spacing. The technology choices came after.

This version lasted longer than the others. It looked distinct. People noticed it. But over time, I started to feel the limitations. Neumorphism works well for small UI elements, but it can be hard to scale across a full portfolio. Some sections felt heavy, others felt repetitive.

## Iteration Four: Here We Are

The current version is the result of everything I learned from the previous three.

I moved to **TanStack Start** because I wanted a framework that gave me full control without the overhead. Combined with **Tailwind CSS v4**, I could define every design token from scratch and have complete control over how everything looked. **Framer Motion** handles the animations, keeping them smooth and purposeful rather than decorative.

The deployment goes to **Cloudflare Workers**. No cold starts, global edge, and the workflow with Wrangler is surprisingly painless.

The biggest change though is the content. Earlier portfolios were mostly about me showing what I could build. This one reflects what I am actually working on now. **OSSAfrica**, open source contributions, and the things I am passionate about as a developer.

I also added a blog. Not because every developer needs one, but because I have things to say. Writing about what I build, what I learn, and what I think about is part of how I grow.

## Tech Stack

- **TanStack Start** for routing and server-side rendering
- **Tailwind CSS v4** for styling with a custom theme
- **Framer Motion** for smooth, purposeful animations
- **Cloudflare Workers** for deployment at the edge
- **Content Collections** for managing this blog

## What I Learned

1. Design first, technology second. The tools you use matter less than knowing what you want to build.
2. Every iteration teaches you something. The failed attempts were not wasted time.
3. Your portfolio should reflect where you are now, not where you were three years ago.
4. A distinct design is memorable. Generic portfolios get ignored.
5. Writing about your work forces you to understand it better.

## What's Next

I am planning more interactive elements. There is a terminal on the site that runs more commands. I want to expand that and make it more useful.

I also want to write more. About open source work, about talks I have given, and about the things I am building at OSSAfrica.

The portfolio is never really finished. It is a living document of who I am as a developer.
