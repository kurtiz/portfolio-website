import {createFileRoute} from '@tanstack/react-router';

function truncate(text: string, maxLen: number, lineLen: number): [string, string?] {
  if (!text) return ['', undefined];
  if (text.length <= maxLen) {
    const mid = Math.floor(text.length / 2);
    const breakIdx = text.lastIndexOf(' ', Math.min(mid + lineLen / 2, text.length));
    if (breakIdx > 0 && text.length > lineLen) {
      return [text.slice(0, breakIdx), text.slice(breakIdx + 1)];
    }
    return [text, undefined];
  }
  const truncated = text.slice(0, maxLen - 3).trimEnd() + '...';
  const mid = Math.floor(truncated.length / 2);
  const breakIdx = truncated.lastIndexOf(' ', Math.min(mid + lineLen / 2, truncated.length));
  if (breakIdx > 0 && truncated.length > lineLen) {
    return [truncated.slice(0, breakIdx), truncated.slice(breakIdx + 1)];
  }
  return [truncated, undefined];
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateOgSvg(title: string, description: string, page: string, image?: string): string {
  const [titleLine1, titleLine2] = truncate(title, 80, 40);
  const [descLine1, descLine2] = truncate(description, 140, 70);

  const hasImage = !!image;
  const titleSize = hasImage ? 34 : 42;

  const textX = 128;
  let textY = 200;
  const avatarCY = 140;

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#faf9f7"/>
      <stop offset="100%" stop-color="#f2f1ee"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#2d2d35" flood-opacity="0.1"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="80" width="1040" height="470" rx="32" fill="#faf9f7" filter="url(#shadow)"/>
  <rect x="80" y="80" width="8" height="470" rx="4" fill="#e88d67"/>
  <circle cx="152" cy="${avatarCY}" r="20" fill="#e88d67"/>
  <text x="152" y="${avatarCY + 6}" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="900" font-family="Inter, Helvetica Neue, sans-serif">AD</text>
  <text x="184" y="${avatarCY - 2}" fill="#2d2d35" font-size="15" font-weight="600" font-family="Inter, Helvetica Neue, sans-serif">Aaron Will Djaba</text>
  <text x="184" y="${avatarCY + 12}" fill="#8a8a8f" font-size="12" font-family="Inter, Helvetica Neue, sans-serif">iamaaronwilldjaba.me</text>
  <text x="${textX}" y="${textY - 20}" fill="#e88d67" font-size="12" font-weight="600" letter-spacing="2" font-family="Inter, Helvetica Neue, sans-serif">${escapeXml(page.toUpperCase())}</text>
  ${titleLine2
    ? `<text x="${textX}" y="${textY + 20}" fill="#2d2d35" font-size="${titleSize}" font-weight="700" font-family="Inter, Helvetica Neue, sans-serif">${escapeXml(titleLine1)}</text>
  <text x="${textX}" y="${textY + 20 + titleSize + 4}" fill="#2d2d35" font-size="${titleSize}" font-weight="700" font-family="Inter, Helvetica Neue, sans-serif">${escapeXml(titleLine2)}</text>`
    : `<text x="${textX}" y="${textY + 20}" fill="#2d2d35" font-size="${titleSize}" font-weight="700" font-family="Inter, Helvetica Neue, sans-serif">${escapeXml(titleLine1)}</text>`
  }
  ${(() => {
    const descY = titleLine2 ? textY + 20 + titleSize * 2 + 16 : textY + 20 + titleSize + 16;
    return descLine2
      ? `<text x="${textX}" y="${descY}" fill="#8a8a8f" font-size="15" font-family="Inter, Helvetica Neue, sans-serif">${escapeXml(descLine1)}</text>
  <text x="${textX}" y="${descY + 24}" fill="#8a8a8f" font-size="15" font-family="Inter, Helvetica Neue, sans-serif">${escapeXml(descLine2)}</text>`
      : `<text x="${textX}" y="${descY}" fill="#8a8a8f" font-size="15" font-family="Inter, Helvetica Neue, sans-serif">${escapeXml(descLine1)}</text>`;
  })()}
  <rect x="${textX}" y="510" width="100" height="2" fill="#e8e7e3"/>
  ${hasImage ? `<clipPath id="imgClip"><rect x="708" y="104" width="384" height="422" rx="16"/></clipPath>
  <image x="708" y="104" width="384" height="422" clip-path="url(#imgClip)" href="${escapeXml(image!)}"/>` : ''}
</svg>`;
}

export const Route = createFileRoute('/api/og')({
  server: {
    handlers: ({createHandlers}) =>
      createHandlers({
        GET: {
          handler: async ({request}) => {
            try {
              const url = new URL(request.url);
              const title = url.searchParams.get('title') || 'Aaron Will Djaba';
              const description = url.searchParams.get('description') || 'Full-Stack Developer and Open Source contributor';
              const page = url.searchParams.get('page') || 'Portfolio';
              const image = url.searchParams.get('image') || undefined;

              const svg = generateOgSvg(title, description, page, image);

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
                headers: {'Content-Type': 'text/plain'},
              });
            }
          },
        },
      }),
  },
});
