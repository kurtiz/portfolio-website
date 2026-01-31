import {createFileRoute} from '@tanstack/react-router';

/**
 * OG Image configurations for each page
 * Using site's actual theme colors from styles.css
 */
const ogConfigs: Record<string, {
    title: string;
    description: string;
    page: string;
    icon: string;
}> = {
    home: {
        title: 'Aaron Will Djaba',
        description: 'Full-Stack Developer and Open Source contributor building digital experiences',
        page: 'Portfolio',
        icon: '👨‍💻',
    },
    'work-experience': {
        title: 'Work Experience',
        description: '8+ years building for the web',
        page: 'Career',
        icon: '💼',
    },
    expertise: {
        title: 'My Expertise',
        description: 'Skills & technologies I work with',
        page: 'Skills',
        icon: '🎯',
    },
    terminal: {
        title: 'Interactive Terminal',
        description: 'Explore my portfolio via command line',
        page: 'Terminal',
        icon: '⌨️',
    },
    projects: {
        title: 'Projects',
        description: 'Showcase of my recent work',
        page: 'Portfolio',
        icon: '🚀',
    },
};

/**
 * Generate SVG OG Image using site's actual theme
 */
function generateOGImageSVG(config: {
    title: string;
    description: string;
    page: string;
    icon: string;
}): string {
    const {title, description, page, icon} = config;

    // Site theme colors (from styles.css)
    const colors = {
        background: '#faf9f7',      // Warm cream (light mode)
        foreground: '#2d2d35',      // Deep charcoal
        accent: '#e88d67',          // Coral accent
        success: '#6bb894',         // Success green
        card: '#faf9f7',            // Card background
        secondary: '#f2f1ee',       // Soft cream secondary
        muted: '#8a8a8f',           // Muted text
        border: '#e8e7e3',          // Border color
    };

    // Escape special characters for XML
    const escapeXml = (str: string) => str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Subtle gradient overlay -->
    <linearGradient id="subtleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.background};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
    
    <!-- Card shadow -->
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="rgba(45,45,53,0.08)"/>
    </filter>
    
    <!-- Soft shadow for elements -->
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(45,45,53,0.06)"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#subtleGradient)"/>
  
  <!-- Main card container (neumorphic style) -->
  <rect 
    x="80" 
    y="80" 
    width="1040" 
    height="470" 
    rx="32" 
    fill="${colors.card}" 
    filter="url(#cardShadow)"
  />
  
  <!-- Accent bar on left -->
  <rect 
    x="80" 
    y="80" 
    width="8" 
    height="470" 
    rx="4" 
    fill="${colors.accent}"
  />
  
  <!-- Content area -->
  
  <!-- Icon with background -->
  <circle cx="200" cy="200" r="50" fill="${colors.secondary}"/>
  <text 
    x="200" 
    y="225" 
    font-size="60" 
    text-anchor="middle"
  >${icon}</text>
  
  <!-- Page label -->
  <rect 
    x="280" 
    y="165" 
    width="auto" 
    height="36" 
    rx="18" 
    fill="${colors.accent}" 
    opacity="0.1"
  />
  <text 
    x="300" 
    y="190" 
    font-family="JetBrains Mono, monospace" 
    font-size="14" 
    font-weight="600" 
    fill="${colors.accent}"
    letter-spacing="1"
  >${escapeXml(page.toLowerCase())}</text>
  
  <!-- Title -->
  <text 
    x="280" 
    y="240" 
    font-family="Inter, system-ui, sans-serif" 
    font-size="52" 
    font-weight="700" 
    fill="${colors.foreground}"
  >${escapeXml(title)}</text>
  
  <!-- Description -->
  <text 
    x="280" 
    y="300" 
    font-family="Inter, system-ui, sans-serif" 
    font-size="18" 
    fill="${colors.muted}"
  >${escapeXml(description)}</text>
  
  <!-- Decorative line -->
  <line 
    x1="280" 
    y1="340" 
    x2="480" 
    y2="340" 
    stroke="${colors.border}" 
    stroke-width="2"
  />
  
  <!-- Footer section -->
  <g transform="translate(280, 420)">
    <!-- Avatar circle -->
    <circle cx="30" cy="30" r="30" fill="${colors.accent}"/>
    <text 
      x="30" 
      y="40" 
      font-family="Inter, system-ui, sans-serif" 
      font-size="24" 
      font-weight="900" 
      fill="white" 
      text-anchor="middle"
    >AD</text>
    
    <!-- Name and domain -->
    <text 
      x="80" 
      y="25" 
      font-family="Inter, system-ui, sans-serif" 
      font-size="20" 
      font-weight="600" 
      fill="${colors.foreground}"
    >Aaron Will Djaba</text>
    
    <text 
      x="80" 
      y="48" 
      font-family="JetBrains Mono, monospace" 
      font-size="14" 
      fill="${colors.muted}"
    >iamaaronwilldjaba.me</text>
  </g>
  
  <!-- Subtle corner decoration -->
  <circle cx="1050" cy="150" r="80" fill="${colors.accent}" opacity="0.05"/>
  <circle cx="1050" cy="150" r="50" fill="${colors.accent}" opacity="0.08"/>
</svg>`;
}

export const Route = createFileRoute('/api/og')({
    server: {
        handlers: ({createHandlers}) =>
            createHandlers({
                GET: {
                    handler: async ({request}) => {
                        try {
                            // Get page parameter from URL
                            const url = new URL(request.url);
                            const page = url.searchParams.get('page') || 'home';

                            // Get config for the page
                            const config = ogConfigs[page] || ogConfigs.home;

                            // Generate SVG
                            const svg = generateOGImageSVG(config);

                            // Return SVG as image
                            return new Response(svg, {
                                headers: {
                                    'Content-Type': 'image/svg+xml',
                                    'Cache-Control': 'public, max-age=31536000, immutable',
                                },
                            });
                        } catch (error) {
                            console.error('Error generating OG image:', error);

                            return new Response('Error generating image', {
                                status: 500,
                                headers: {
                                    'Content-Type': 'text/plain',
                                },
                            });
                        }
                    },
                },
            }),
    },
});
