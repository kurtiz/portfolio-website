import {createFileRoute} from '@tanstack/react-router';

/**
 * OG Image configurations for each page
 */
const ogConfigs: Record<string, {
    title: string;
    description: string;
    page: string;
    gradientStart: string;
    gradientEnd: string;
    icon: string;
}> = {
    home: {
        title: 'Aaron Will Djaba',
        description: 'Full-Stack Developer building digital experiences',
        page: 'Portfolio',
        gradientStart: '#667eea',
        gradientEnd: '#764ba2',
        icon: '👨‍💻',
    },
    'work-experience': {
        title: 'Work Experience',
        description: '5+ years building for the web',
        page: 'Career',
        gradientStart: '#f093fb',
        gradientEnd: '#f5576c',
        icon: '💼',
    },
    expertise: {
        title: 'My Expertise',
        description: 'Skills & technologies I work with',
        page: 'Skills',
        gradientStart: '#4facfe',
        gradientEnd: '#00f2fe',
        icon: '🎯',
    },
    terminal: {
        title: 'Interactive Terminal',
        description: 'Explore my portfolio via command line',
        page: 'Terminal',
        gradientStart: '#43e97b',
        gradientEnd: '#38f9d7',
        icon: '⌨️',
    },
    projects: {
        title: 'Projects',
        description: 'Showcase of my recent work',
        page: 'Portfolio',
        gradientStart: '#fa709a',
        gradientEnd: '#fee140',
        icon: '🚀',
    },
};

/**
 * Generate SVG OG Image
 */
function generateOGImageSVG(config: {
    title: string;
    description: string;
    page: string;
    gradientStart: string;
    gradientEnd: string;
    icon: string;
}): string {
    const {title, description, page, gradientStart, gradientEnd, icon} = config;

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
    <!-- Main gradient -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradientStart};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${gradientEnd};stop-opacity:1" />
    </linearGradient>
    
    <!-- Pattern for dots -->
    <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="2" fill="white" opacity="0.1"/>
      <circle cx="45" cy="45" r="2" fill="white" opacity="0.1"/>
    </pattern>
    
    <!-- Text shadow filter -->
    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
    
    <!-- Icon shadow filter -->
    <filter id="iconShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Dot pattern overlay -->
  <rect width="1200" height="630" fill="url(#dots)"/>
  
  <!-- Icon -->
  <text 
    x="600" 
    y="180" 
    font-size="100" 
    text-anchor="middle" 
    filter="url(#iconShadow)"
  >${icon}</text>
  
  <!-- Page label badge -->
  <rect 
    x="480" 
    y="220" 
    width="240" 
    height="50" 
    rx="25" 
    fill="rgba(255,255,255,0.2)" 
    stroke="rgba(255,255,255,0.3)" 
    stroke-width="2"
  />
  <text 
    x="600" 
    y="253" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="20" 
    font-weight="600" 
    fill="white" 
    text-anchor="middle"
    letter-spacing="2"
  >${escapeXml(page.toUpperCase())}</text>
  
  <!-- Title -->
  <text 
    x="600" 
    y="340" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="56" 
    font-weight="900" 
    fill="white" 
    text-anchor="middle"
    filter="url(#textShadow)"
  >${escapeXml(title)}</text>
  
  <!-- Description -->
  <text 
    x="600" 
    y="400" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="28" 
    fill="rgba(255,255,255,0.9)" 
    text-anchor="middle"
  >${escapeXml(description)}</text>
  
  <!-- Footer: Avatar circle -->
  <circle cx="440" cy="530" r="35" fill="white"/>
  <text 
    x="440" 
    y="542" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="28" 
    font-weight="900" 
    fill="${gradientStart}" 
    text-anchor="middle"
  >AD</text>
  
  <!-- Footer: Name -->
  <text 
    x="495" 
    y="520" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="24" 
    font-weight="700" 
    fill="white"
  >Aaron Will Djaba</text>
  
  <!-- Footer: Domain -->
  <text 
    x="495" 
    y="550" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="18" 
    fill="rgba(255,255,255,0.8)"
  >aarondjaba.com</text>
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
