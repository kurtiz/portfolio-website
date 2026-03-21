export type ProjectType = 'web-app' | 'cli-tool' | 'library' | 'client' | 'docs';

export interface Project {
    id: string;
    title: string;
    description: string;
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
        type: 'library',
        techStack: ['TypeScript', 'Go', 'Rust'],
        tags: ['Security', 'Cryptography', 'Browser'],
        links: {
            github: 'https://github.com/ossafrica/bvault-js',
            live: 'https://bvault-js.vercel.app',
        },
        featured: true,
        image: '/projects/bvault.jpeg',
    },
    {
        id: 'vedatrace',
        title: 'VedaTrace',
        description: 'AI-powered log management and observability platform. Debug faster with plain-English explanations and edge-powered ingestion.',
        type: 'web-app',
        techStack: ['TypeScript', 'Python', 'Dart', 'Go'],
        tags: ['AI', 'Observability', 'Edge', 'SaaS'],
        links: {
            live: 'https://vedatrace.dev/',
            docs: 'https://docs.vedatrace.dev/',
        },
        featured: true,
        image: '/projects/vedatrace-dashboard.jpeg',
    },
    {
        id: 'vedatrace-docs',
        title: 'VedaTrace Docs',
        description: 'Comprehensive documentation for the VedaTrace logging platform, including SDK references, guides, and API documentation.',
        type: 'docs',
        techStack: ['Docusaurus', 'TypeScript'],
        tags: ['Documentation', 'SDK'],
        links: {
            live: 'https://docs.vedatrace.dev/',
        },
        image: '/projects/vedatrace-docs.jpeg',
    },
    {
        id: 'hono-cloudflare-starter',
        title: 'hono-cloudflare-starter',
        description: 'A production-ready authentication backend template built with Hono, Better Auth, Drizzle ORM, and Cloudflare Workers.',
        type: 'library',
        techStack: ['TypeScript', 'Hono', 'Better Auth', 'Drizzle'],
        tags: ['Cloudflare', 'Backend', 'Auth', 'Starter'],
        links: {
            github: 'https://github.com/kurtiz/hono-cloudflare-starter',
        },
        image: '/projects/hono-cloudflare-starter.png',
    },
    {
        id: 'dhclc',
        title: 'DHCLC Website',
        description: 'Website for Divine Heals Counselling Centre — a professional online presence for counseling and mental health services.',
        type: 'client',
        techStack: ['React', 'Next.js'],
        tags: ['Healthcare', 'WordPress'],
        links: {
            live: 'https://dhclc.org/',
        },
        image: '/projects/dhclc.jpeg',
    },
    {
        id: 'ussd-simulator',
        title: 'USSD Simulator',
        description: 'A modern, browser-based USSD simulator to test and debug USSD applications with an intuitive phone dialer interface.',
        type: 'cli-tool',
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
        type: 'cli-tool',
        techStack: ['Go', 'Cobra'],
        tags: ['AI', 'Social Media', 'Automation', 'Git'],
        links: {
            github: 'https://github.com/kurtiz/commit-feed',
        },
        image: '/projects/commit-feed.gif',
    },
];

export const allTechStack = [...new Set(projects.flatMap(p => p.techStack))].sort();
