export type ProjectType = 'web-app' | 'cli-tool' | 'library' | 'client' | 'docs';

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
    { value: 'web-app', label: 'Web Apps' },
    { value: 'cli-tool', label: 'CLI Tools' },
    { value: 'library', label: 'Libraries' },
    { value: 'client', label: 'Client Projects' },
    { value: 'docs', label: 'Documentation' },
];

export const projects: Project[] = [
    {
        id: 'bvault-js',
        title: 'bVault.js',
        description: 'A type-safe, lightweight, zero-dependency cryptographic library for secure encryption and decryption in browser environments.',
        longDescription: `bVault-js is a type-safe, lightweight, zero-dependency cryptographic library for secure encryption and decryption in browser environments. It implements AES-GCM encryption with PBKDF2 key derivation, providing a simple API for data protection.

## Features

- AES-GCM 256-bit encryption
- Password-based key derivation (PBKDF2 with 100 thousand iterations)
- Automatic salt and IV generation
- Built-in error handling for cryptographic operations
- Works in browsers (using Web Crypto API)
- Secure Local Storage Wrapper – store/retrieve data in localStorage securely with automatic encryption/decryption
- Secure Session Storage Wrapper – store/retrieve data in sessionStorage securely with automatic encryption/decryption

## Security Notes

- Always use strong, unique passwords for encryption
- Safely store IVs and salts with encrypted data
- Never hardcode passwords in source code
- Consider rotating encryption keys periodically
- Use HTTPS when transmitting encrypted data`,
        type: 'library',
        techStack: ['TypeScript', 'Go', 'Rust'],
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
- Complete SDK ecosystem for all major programming languages
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
        description: 'Website for Divine Heals Counselling Centre - a professional online presence for counseling and mental health services.',
        longDescription: `A professional website for Divine Heals Counselling Centre - providing accessible counseling and mental health services.

## Features

- Professional service presentation
- Contact information and booking
- Service descriptions
- Responsive design for all devices
- Professional imagery and branding`,
        type: 'client',
        techStack: ['React', 'Next.js'],
        tags: ['Healthcare', 'Counseling'],
        links: {
            live: 'https://dhclc.org/',
        },
        image: 'https://assets.iamaaronwilldjaba.me/projects/dhclc.jpeg',
    },
    {
        id: 'ussd-simulator',
        title: 'USSD Simulator',
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
