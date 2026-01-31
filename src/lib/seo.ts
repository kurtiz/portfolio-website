/**
 * SEO and Social Media Meta Tags Configuration
 *
 * This file provides utilities for generating SEO-friendly meta tags
 * for social media previews (Open Graph, Twitter Cards, etc.)
 */

export interface SEOConfig {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
    keywords?: string[];
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
}

export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    author: {
        name: string;
        email?: string;
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    ogImage: string; // Default Open Graph image
    twitterHandle?: string;
    locale?: string;
    themeColor?: string;
}

/**
 * Default site configuration
 * Update this with your actual information
 */
export const siteConfig: SiteConfig = {
    name: "Aaron Will Djaba",
    description: "Full-Stack Developer and Open Source Contributor building digital experiences with modern web technologies. Specializing in React, Node.js, and cloud solutions.",
    url: "https://iamaaronwilldjaba.me",
    author: {
        name: "Aaron Will Djaba",
        email: "aaronwilldjaba@outlook.com",
        twitter: "@aaronwilldjaba",
        linkedin: "https://www.linkedin.com/in/aaron-will-djaba-424b7a184",
        github: "kurtiz",
    },
    ogImage: "/og-image.png",
    twitterHandle: "@aaronwilldjaba",
    locale: "en_US",
    themeColor: "#FCF9EAFF",
};

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(config: SEOConfig) {
    const {
        title,
        description,
        image = siteConfig.ogImage,
        url = siteConfig.url,
        type = 'website',
        author = siteConfig.author.name,
        keywords = [],
        publishedTime,
        modifiedTime,
        section,
        tags = [],
    } = config;

    const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
    const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
    const pageUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;

    return {
        // Basic Meta Tags
        title: fullTitle,
        meta: [
            // Charset and viewport (usually in root)
            {charSet: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},

            // Primary Meta Tags
            {name: 'title', content: fullTitle},
            {name: 'description', content: description},
            {name: 'author', content: author},
            ...(keywords.length > 0 ? [{name: 'keywords', content: keywords.join(', ')}] : []),

            // Theme Color
            {name: 'theme-color', content: siteConfig.themeColor},
            {name: 'msapplication-TileColor', content: siteConfig.themeColor},

            // Open Graph / Facebook
            {property: 'og:type', content: type},
            {property: 'og:url', content: pageUrl},
            {property: 'og:title', content: fullTitle},
            {property: 'og:description', content: description},
            {property: 'og:image', content: imageUrl},
            {property: 'og:image:width', content: '1200'},
            {property: 'og:image:height', content: '630'},
            {property: 'og:site_name', content: siteConfig.name},
            {property: 'og:locale', content: siteConfig.locale},

            // Article specific (if type is article)
            ...(type === 'article' && publishedTime ? [
                {property: 'article:published_time', content: publishedTime},
            ] : []),
            ...(type === 'article' && modifiedTime ? [
                {property: 'article:modified_time', content: modifiedTime},
            ] : []),
            ...(type === 'article' && section ? [
                {property: 'article:section', content: section},
            ] : []),
            ...(type === 'article' && tags.length > 0 ?
                    tags.map(tag => ({property: 'article:tag', content: tag})) : []
            ),

            // Twitter Card
            {name: 'twitter:card', content: 'summary_large_image'},
            {name: 'twitter:url', content: pageUrl},
            {name: 'twitter:title', content: fullTitle},
            {name: 'twitter:description', content: description},
            {name: 'twitter:image', content: imageUrl},
            ...(siteConfig.twitterHandle ? [
                {name: 'twitter:creator', content: siteConfig.twitterHandle},
                {name: 'twitter:site', content: siteConfig.twitterHandle},
            ] : []),

            // LinkedIn
            {property: 'og:image:alt', content: fullTitle},

            // WhatsApp (uses Open Graph)
            // No specific tags needed, uses og:image, og:title, og:description

            // Additional SEO
            {name: 'robots', content: 'index, follow'},
            {name: 'googlebot', content: 'index, follow'},
            {name: 'language', content: 'English'},
            {name: 'revisit-after', content: '7 days'},
        ],
        links: [
            // Canonical URL
            {rel: 'canonical', href: pageUrl},

            // Favicon
            {rel: 'icon', href: '/favicon.ico'},
            {rel: 'apple-touch-icon', href: '/apple-touch-icon.png'},

            // Manifest
            {rel: 'manifest', href: '/site.webmanifest'},
        ],
    };
}

/**
 * Page-specific SEO configurations
 */
export const pageSEO = {
    home: {
        title: siteConfig.name,
        description: siteConfig.description,
        keywords: ['full-stack developer', 'web developer', 'react developer', 'node.js', 'portfolio', 'Aaron Djaba'],
        url: '/',
    },

    workExperience: {
        title: 'Work Experience',
        description: 'My professional journey and career progression. Explore the companies I\'ve worked with and the roles I\'ve held over 5+ years in software development.',
        keywords: ['work experience', 'career', 'professional history', 'software engineer', 'developer jobs'],
        url: '/work-experience',
        type: 'profile' as const,
    },

    expertise: {
        title: 'My Expertise',
        description: 'Skills and technologies I work with. From frontend development with React to backend systems with Node.js, explore my technical expertise.',
        keywords: ['skills', 'expertise', 'technologies', 'react', 'node.js', 'typescript', 'web development'],
        url: '/expertise',
    },

    terminal: {
        title: 'Interactive Terminal',
        description: 'Explore my portfolio through an interactive terminal interface. Navigate my projects, skills, and experience using command-line commands.',
        keywords: ['terminal', 'cli', 'interactive', 'command line', 'developer tools'],
        url: '/terminal',
    },

    projects: {
        title: 'Projects',
        description: 'A showcase of my recent projects and work. From web applications to mobile apps, see what I\'ve built.',
        keywords: ['projects', 'portfolio', 'web apps', 'mobile apps', 'case studies'],
        url: '/projects',
    },

    blog: {
        title: 'Blog',
        description: 'Thoughts, tutorials, and insights on web development, programming, and technology.',
        keywords: ['blog', 'articles', 'tutorials', 'web development', 'programming'],
        url: '/blog',
        type: 'website' as const,
    },
};

/**
 * Generate JSON-LD structured data for rich snippets
 */
export function generateStructuredData(type: 'person' | 'website' | 'article', data?: any) {
    const baseUrl = siteConfig.url;

    if (type === 'person') {
        return {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: siteConfig.author.name,
            url: baseUrl,
            image: `${baseUrl}${siteConfig.ogImage}`,
            jobTitle: 'Full-Stack Developer',
            worksFor: {
                '@type': 'Organization',
                name: 'Tech Corp', // Update with current company
            },
            sameAs: [
                siteConfig.author.twitter ? `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}` : '',
                siteConfig.author.linkedin ? `https://linkedin.com/in/${siteConfig.author.linkedin}` : '',
                siteConfig.author.github ? `https://github.com/${siteConfig.author.github}` : '',
            ].filter(Boolean),
        };
    }

    if (type === 'website') {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteConfig.name,
            url: baseUrl,
            description: siteConfig.description,
            author: {
                '@type': 'Person',
                name: siteConfig.author.name,
            },
        };
    }

    if (type === 'article' && data) {
        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.title,
            description: data.description,
            image: data.image ? `${baseUrl}${data.image}` : `${baseUrl}${siteConfig.ogImage}`,
            datePublished: data.publishedTime,
            dateModified: data.modifiedTime || data.publishedTime,
            author: {
                '@type': 'Person',
                name: siteConfig.author.name,
            },
        };
    }

    return null;
}
