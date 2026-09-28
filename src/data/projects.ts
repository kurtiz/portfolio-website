export type ProjectType = 'web-app' | 'mobile-app' | 'cli-tool' | 'library' | 'client' | 'docs';

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    type: ProjectType;
    techStack: string[];
    tags: string[];
    links: {
        github?: string;
        live?: string;
        docs?: string;
    };
    featured?: boolean;
    image?: string;
}

export const projectTypes: { value: ProjectType; label: string }[] = [
    {value: 'web-app', label: 'Web Apps'},
    {value: 'mobile-app', label: 'Mobile Apps'},
    {value: 'cli-tool', label: 'CLI Tools'},
    {value: 'library', label: 'Libraries'},
    {value: 'client', label: 'Client Projects'},
    {value: 'docs', label: 'Documentation'},
];

export const projects: Project[] = [
    {
        id: 'forge',
        title: 'Forge',
        description: 'An evidence-first verifier for web apps that explores deployed sites, reproduces failures, and shows what happened with browser traces and artifacts.',
        longDescription: `Forge verifies deployed web applications from the outside. Give it a URL and it discovers user journeys, runs them, reproduces failures, and reports findings backed by evidence. A later run can verify whether a fix worked.

## Features

- Browser-based journey discovery and execution, with an HTTP fallback
- Failure classification and reproducibility checks before reporting confirmed bugs
- Screenshots, console and network evidence, recordings, and agent traces
- Live run progress, saved projects, and evidence-backed findings in the web console
- CLI and REST API for verification from a terminal or CI pipeline
- GitHub pull request checks for preview deployments
- Scheduled monitoring with notifications when a site's status changes

Built with TanStack Start, Cloudflare Workers, Durable Objects, D1, R2, Workers AI, and Solari browsers.`,
        type: 'web-app',
        techStack: ['TanStack Start', 'TypeScript', 'Cloudflare Workers', 'Durable Objects', 'Cloudflare D1', 'Cloudflare R2', 'Workers AI'],
        tags: ['Testing', 'AI Agents', 'Developer Tools', 'Cloudflare'],
        links: {
            github: 'https://github.com/kurtiz/forge',
            live: 'https://forge.papiliocurtis.workers.dev/',
        },
        featured: true,
    },
    {
        id: 'wakaboard',
        title: 'WakaBoard',
        description: 'An open source iOS and Android WakaTime companion for coding activity, daily goals, insights, and leaderboards.',
        longDescription: `WakaBoard is a mobile companion for WakaTime, built with Expo and React Native. It turns coding activity into a dashboard and lets users connect with WakaTime sign-in or an API key. The app is in active development.

## Features

- Sync coding summaries with project, language, and editor breakdowns
- Set a daily coding goal and review previously downloaded activity offline
- Browse leaderboards and member profiles while connected
- Manage appearance and sync preferences, sign out, and clear downloaded activity
- Cloudflare Worker for WakaTime OAuth and API requests; local SQLite cache for activity`,
        type: 'mobile-app',
        techStack: ['Expo', 'React Native', 'TypeScript', 'Cloudflare Workers', 'Cloudflare D1', 'SQLite'],
        tags: ['Mobile', 'WakaTime', 'Developer Tools', 'Open Source'],
        links: {},
        featured: true,
    },
    {
        id: 'our-pos',
        title: 'OurPOS',
        description: 'A complete Point of Sale (POS) system with inventory management, customer tracking, multi-POS support, AI assistant, and audit logging.',
        longDescription: `A full-featured Point of Sale system built with TanStack Start and Cloudflare Workers. Supports multi-POS environments, barcode scanning (keyboard wedge + camera), credit sales, saved/paused sales, multi-tax (direct/compound), and atomic stock decrement with idempotency protection.

## Features

- **Point of Sale** - Local-first product grid with real-time stock, barcode scanner, shopping cart with tax breakdown, checkout with 8 payment methods, and post-checkout receipt (print/PDF)
- **Multi-POS Support** - Cross-tab stock sync with 30s polling and atomic SQL-level overselling prevention
- **Dashboard** - Real-time sales stats, 7-day chart, recent orders, low stock alerts
- **Sales History & Receipts** - Paginated history with search, print, PDF download
- **Stock Management** - Inventory table, low stock alerts, stock movements with audit trail
- **Inventory Transfers** - Multi-location transfer workflow with status tracking
- **Products** - Full CRUD with variant management, product types (physical/service/digital), and stock movements
- **Services & Appointments** - Staff management, appointment scheduling with calendar, one-click order from appointment
- **Customer Management** - CRM with credit limits and purchase history
- **Settings** - Store config, feature flags, tax setup, notifications, integrations
- **Audit Log** - Activity history with field-level changes and device information
- **AI Assistant (Pixi)** - Conversational AI with import capability (CSV/Excel to products), Text2SQL analytics, product substitution, and natural language cart staging
- **Authentication** - Better Auth with email/password, Google OAuth, email verification, password reset, 2FA
- **Multi-Tenant** - Organization-based stores with per-store settings`,
        type: 'web-app',
        techStack: ['TanStack Start', 'React', 'TypeScript', 'Better Auth', 'Drizzle', 'Tailwind CSS', 'Cloudflare D1', 'Cloudflare R2', 'Cloudflare Workers AI'],
        tags: ['POS', 'SaaS', 'Inventory', 'AI', 'Multi-Tenant', 'Cloudflare'],
        links: {
            live: 'https://pos.247technologies.org',
        },
        featured: true,
        image: 'https://assets.iamaaronwilldjaba.me/projects/our-pos.png',
    },
    {
        id: 'skillguard',
        title: 'SkillGuard',
        description: 'A security scanner for AI agent "skills" defined in Markdown. Evaluates skill definitions for security risks, malicious intents, and supply chain vulnerabilities.',
        longDescription: `SkillGuard is a security scanner for AI agent "skills" defined in Markdown. It evaluates skill definitions for security risks, malicious intents, and supply chain vulnerabilities, providing transparency to developers and end-users.

## Why SkillGuard?

AI Agents are only as safe as the skills they are given. As the ecosystem of AI agents grows, so does the risk of malicious skills, prompt injection, supply chain attacks, and excessive permissions. SkillGuard provides the first line of defense by analyzing skill definitions before they're loaded into an agent.

## Features

- **YAML frontmatter parsing** - Extracts skill metadata from Markdown files
- **Multi-category security scoring** - Weighted scoring with exponential decay
- **Risk detection** - Shell command execution, credential exposure, prompt injection, obfuscated code, HTTP/Git dependencies, hidden characters
- **CI/CD integration** - Threshold-based exit codes for automated pipelines
- **Multiple output formats** - Colored CLI output and JSON reports
- **Configurable** - Custom thresholds, paths, and trusted domains

## Security Scoring

SkillGuard uses a multi-category scoring system with weighted averages:
- Security (3.0x weight) - Shell access, file access, credentials, obfuscated code
- Supply Chain (2.0x weight) - External scripts, git/http dependencies
- Transparency (1.5x weight) - Metadata completeness, prompt injection risks
- Quality (1.5x weight) - Tool access patterns
- Maintenance (1.0x weight) - Telemetry, protestware detection

## Install

# Binary\n
brew install ossafrica/skillguard/skillguard

# Docker\n
docker pull ghcr.io/ossafrica/skillguard:latest

# Build from source\n
go build -o skillguard .
`,
        type: 'cli-tool',
        techStack: ['Go', 'Cobra'],
        tags: ['Security', 'AI Agents', 'Supply Chain', 'CLI'],
        links: {
            github: 'https://github.com/OSSAfrica/skillguard',
        },
        featured: true,
        image: 'https://assets.iamaaronwilldjaba.me/projects/skillguard.gif',
    },
    {
        id: 'bvault-js',
        title: 'bVault.js',
        description: 'A zero-dependency TypeScript library that encrypts localStorage and sessionStorage data with a non-exportable browser key.',
        longDescription: `bVault-js provides encrypted wrappers for localStorage and sessionStorage using the Web Crypto API. It generates a non-extractable AES-GCM key and stores it in IndexedDB. The key is never derived from a password.

## Features

- AES-GCM 256-bit encryption
- Non-extractable CryptoKey generated and stored in IndexedDB
- Fresh IV for each encrypted value
- Encrypted localStorage and sessionStorage wrappers
- Safe to import during server-side rendering
- Fully typed with no runtime dependencies

## Security Notes

- Protects against copying browser storage for replay elsewhere
- Does not protect against live malicious scripts that can call the decryption API
- Clearing the IndexedDB key makes stored values unreadable; use it for recoverable data`,
        type: 'library',
        techStack: ['TypeScript', 'Web Crypto API', 'IndexedDB'],
        tags: ['Security', 'Cryptography', 'Browser'],
        links: {
            github: 'https://github.com/ossafrica/bvault-js',
            live: 'https://bvault-js.vercel.app',
        },
        featured: true,
        image: 'https://assets.iamaaronwilldjaba.me/projects/bvault.jpeg',
    },
    {
        id: 'vedatrace',
        title: 'VedaTrace',
        description: 'AI-powered log management and observability platform. Debug faster with plain-English explanations and edge-powered ingestion.',
        longDescription: `VedaTrace is an AI-powered observability platform that provides a complete solution for log management, distributed tracing, and error debugging with a minimalist interface.

## Features

- AI-powered debugging with plain-English error analysis
- Instant log ingestion with zero configuration
- Zero-config PII scrubbing for compliance
- Edge-powered performance with <50ms latency
- SDKs for JavaScript/TypeScript, Python, Dart, and Go
- Beautiful, minimalist dashboard for log management

## SDK Support

- JavaScript/TypeScript
- Python
- Dart/Flutter
- Go

## Why VedaTrace?

Built for modern developers who want simplicity without sacrificing power. It delivers enterprise-grade observability without the enterprise complexity.`,
        type: 'web-app',
        techStack: ['TypeScript', 'Python', 'Dart', 'Go'],
        tags: ['AI', 'Observability', 'Edge', 'SaaS'],
        links: {
            live: 'https://vedatrace.dev/',
            docs: 'https://docs.vedatrace.dev/',
        },
        featured: true,
        image: 'https://assets.iamaaronwilldjaba.me/projects/vedatrace-dashboard.jpeg',
    },
    {
        id: 'vedatrace-docs',
        title: 'VedaTrace Docs',
        description: 'Comprehensive documentation for the VedaTrace logging platform, including SDK references, guides, and API documentation.',
        longDescription: `Official documentation for VedaTrace - an AI-powered observability platform.

## Documentation Features

- Modern Fumadocs UI with animated scroll indicator
- Comprehensive documentation for all VedaTrace products
- AI-powered search functionality
- Responsive design for all devices
- Dark/light mode support
- Integration with Cloudflare Workers

## Technology Stack

- Framework: Tanstack Start with React 19
- Documentation: Fumadocs UI and MDX
- Styling: Tailwind CSS v4
- Package Manager: Bun
- Build Tool: Vite
- Deployment: Cloudflare Workers`,
        type: 'docs',
        techStack: ['Fumadocs', 'TypeScript', 'Tailwind CSS'],
        tags: ['Documentation', 'SDK', 'MDX'],
        links: {
            github: 'https://github.com/VedaTrace/vedatrace-docs',
            live: 'https://docs.vedatrace.dev/',
        },
        image: 'https://assets.iamaaronwilldjaba.me/projects/vedatrace-docs.jpeg',
    },
    {
        id: 'hono-cloudflare-starter',
        title: 'hono-cloudflare-starter',
        description: 'A production-ready authentication backend template built with Hono, Better Auth, Drizzle ORM, and Cloudflare Workers.',
        longDescription: `A production-ready authentication backend template built with Hono, Better Auth, Drizzle ORM, and Cloudflare Workers. Spin up secure, scalable APIs in minutes.

## Features

Authentication

- Email/password authentication
- OAuth providers (Google, GitHub, LinkedIn)
- Email verification
- Password reset
- Session management
- Organizations/teams support
- Admin panel

Database

- Type-safe PostgreSQL with Drizzle ORM
- Auto-generated migrations
- Relations and types
- Connection pooling ready

API

- Modern REST API with OpenAPI docs
- Automatic Swagger documentation
- Request validation with Zod
- Health check endpoints
- Rate limiting

Developer Experience

- TypeScript throughout
- Hot reload development
- Powerful CLI scaffolding tool
- Code generators for routes, schemas, middleware
- Comprehensive error handling`,
        type: 'library',
        techStack: ['TypeScript', 'Hono', 'Better Auth', 'Drizzle'],
        tags: ['Cloudflare', 'Backend', 'Auth', 'Starter'],
        links: {
            github: 'https://github.com/kurtiz/hono-cloudflare-starter',
        },
        image: 'https://assets.iamaaronwilldjaba.me/projects/hono-cloudflare-starter.png',
    },
    {
        id: 'dhclc',
        title: 'DHCLC Website',
        description: 'A responsive website for Divine Heals Counseling & Leadership Consultancy, presenting counseling, leadership, and virtual support services.',
        longDescription: `A website for Divine Heals Counseling & Leadership Consultancy, presenting its faith-based counseling, leadership development, and virtual support services.

## Features

- Professional service presentation
- Contact information and inquiry form
- Service descriptions
- Responsive design for all devices
- Professional imagery and branding`,
        type: 'client',
        techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
        tags: ['Counseling', 'Leadership', 'Client'],
        links: {
            live: 'https://dhclc.org/',
        },
        image: 'https://assets.iamaaronwilldjaba.me/projects/dhclc.jpeg',
    },
    {
        id: 'dcdo',
        title: 'DCDO Website',
        description: 'Official website for Dangme Community Development Organisation - a community NGO focused on education, economic growth, healthcare, cultural heritage, and environmental sustainability.',
        longDescription: `A modern, responsive website built for the Dangme Community Development Organisation (DCDO), a community-based NGO dedicated to empowering resilience and prosperity in the Dangme region.

## About DCDO

DCDO focuses on five key impact areas:
- Education - Unlocking potential through access to quality learning
- Economic Growth - Creating opportunities for sustainable livelihoods
- Healthcare - Ensuring well-being for all generations
- Cultural Heritage - Preserving roots while building the future
- Environment - Protecting land for future leaders

## What I Built

- Landing page with impact area highlights and gallery
- About page with organisation history and mission
- Gallery page showcasing community events and projects
- Gallery of community activities and a contact page
- Mobile-first responsive design with smooth animations
- SEO-optimized with structured data for local search`,
        type: 'client',
        techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        tags: ['Client', 'NGO', 'Community', 'Web Design', 'Non-Profit'],
        links: {
            github: 'https://github.com/kurtiz/dcdo-website',
            live: 'https://dcdo-website.vercel.app/',
        },
        image: 'https://assets.iamaaronwilldjaba.me/projects/dcdo.avif',
    },
    {
        id: 'ussd-simulator',
        title: 'USSD Simulator',
        image: 'https://assets.iamaaronwilldjaba.me/projects/ussd-simulator.jpeg',
        description: 'A modern, browser-based USSD simulator to test and debug USSD applications with an intuitive phone dialer interface.',
        longDescription: `A modern, browser-based USSD (Unstructured Supplementary Service Data) simulator built with React, TypeScript, and Tailwind CSS. Test and debug your USSD applications with an intuitive phone dialer interface and comprehensive session management.

## Features

Core Functionality

- Interactive Phone Dialer with authentic keypad interface
- Real-time Session Management with message history
- HTTP API Integration for connecting to USSD gateways
- Session Persistence using Local IndexedDB storage

User Interface

- Responsive Design for desktop, tablet, and mobile
- Dark Theme Support with shadcn/ui components
- Visual Feedback with loading states and error handling
- Intuitive Navigation for session switching and history

Configuration Options

- Custom Endpoints for your USSD gateway URL
- Session Parameters for phone numbers and network codes
- Quick Presets for development and production environments
- Auto-generation of session IDs`,
        type: 'web-app',
        techStack: ['React', 'TypeScript', 'Tailwind CSS'],
        tags: ['Developer Tools', 'Telecom', 'IndexedDB'],
        links: {
            github: 'https://github.com/kurtiz/ussd-simulator',
        },
    },
    {
        id: 'commit-feed',
        title: 'CommitFeed',
        description: 'A CLI tool written in Go that reads Git commits and uses AI to generate ready-to-post content for LinkedIn and Twitter.',
        longDescription: `CommitFeed is a command-line tool written in Go that reads your Git commit history, summarizes recent changes, and uses AI to generate ready-to-post content for platforms like LinkedIn and Twitter.

Perfect for open-source maintainers, indie hackers, or dev teams who want to share progress updates directly from their terminal.

## Features

- AI-powered post generation using Hugging Face or compatible LLMs
- Reads real Git history and formats commits into summaries
- Multi-platform support for LinkedIn and Twitter
- Configurable AI providers (Hugging Face, OpenAI, Gemini, DeepSeek, Grok)
- First-time setup wizard built with Charm's BubbleTea
- Secure local config storing API keys in ~/.commit-feed/config.json

## Supported AI Providers

- Hugging Face (free tier available)
- OpenAI
- Gemini (Google)
- DeepSeek (free tier available)
- Grok (xAI)`,
        type: 'cli-tool',
        techStack: ['Go', 'Cobra'],
        tags: ['AI', 'Social Media', 'Automation', 'Git'],
        links: {
            github: 'https://github.com/kurtiz/commit-feed',
        },
        image: 'https://assets.iamaaronwilldjaba.me/projects/commit-feed.gif',
    },
];

export const allTechStack = [...new Set(projects.flatMap(p => p.techStack))].sort();

export function getProjectById(id: string): Project | undefined {
    return projects.find(p => p.id === id);
}

export function getAdjacentProjects(id: string): { prev: Project | null; next: Project | null } {
    const index = projects.findIndex(p => p.id === id);
    return {
        prev: index > 0 ? projects[index - 1] : null,
        next: index < projects.length - 1 ? projects[index + 1] : null,
    };
}
