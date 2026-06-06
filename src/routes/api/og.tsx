import {createFileRoute} from '@tanstack/react-router';
import {ImageResponse} from 'takumi-js/response';
import {OgImage} from '@/components/og/OgImage';

let fontData: ArrayBuffer | null = null;

async function getInterFont(): Promise<ArrayBuffer> {
  if (fontData) return fontData;
  const response = await fetch(
    'https://iamaaronwilldjaba.me/fonts/Inter.ttf'
  );
  fontData = await response.arrayBuffer();
  return fontData;
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
              const description =
                url.searchParams.get('description') || 'Full-Stack Developer and Open Source contributor';
              const page = url.searchParams.get('page') || 'Portfolio';
              const icon = url.searchParams.get('icon') || '👨‍💻';
              const image = url.searchParams.get('image') || undefined;

              const font = await getInterFont();

              return new ImageResponse(
                <OgImage title={title} description={description} page={page} icon={icon} image={image} />,
                {
                  width: 1200,
                  height: 630,
                  format: 'png',
                  fonts: [
                    {
                      name: 'Inter',
                      data: font,
                      weight: 700,
                      style: 'normal',
                    },
                  ],
                  headers: {
                    'Cache-Control': 'public, max-age=31536000, immutable',
                  },
                },
              );
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
