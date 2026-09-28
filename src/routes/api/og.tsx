import {createFileRoute} from '@tanstack/react-router';
import {projects} from '@/data/projects';
import {pageSEO, siteConfig} from '@/lib/seo';
import {pageOgImage, projectOgImage} from '@/lib/og';

/** Redirect old query-based OG links to their stable PNG replacements. */
export const Route = createFileRoute('/api/og')({
    server: {
        handlers: ({createHandlers}) => createHandlers({
            GET: {
                handler: ({request}) => {
                    const title = new URL(request.url).searchParams.get('title');
                    const project = projects.find(item => item.title === title);
                    const page = Object.entries(pageSEO).find(([, value]) => value.title === title);
                    const path = project
                        ? projectOgImage(project.id)
                        : page
                            ? pageOgImage(page[0])
                            : siteConfig.ogImage;
                    return Response.redirect(new URL(path, request.url), 302);
                },
            },
        }),
    },
});
