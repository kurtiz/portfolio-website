import {type SEOConfig, generateMetaTags, siteConfig} from './seo';

/** Stable, build-generated PNG URLs that link preview crawlers can fetch directly. */
export const pageOgImage = (page: string) => `/og/pages/${page.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}.png`;
export const projectOgImage = (id: string) => `/og/projects/${id}.png`;
export const blogOgImage = (slug: string) => `/og/blog/${slug}.png`;

export function generatePageMetaTags(pageKey: string, seo: SEOConfig) {
    return generateMetaTags({...seo, image: pageOgImage(pageKey)});
}

/** Root metadata covers not-found pages and routes without their own head. */
export function defaultSocialMeta(pathname = '/') {
    const url = new URL(pathname, siteConfig.url).toString();
    const image = new URL(siteConfig.ogImage, siteConfig.url).toString();
    return [
        {name: 'description', content: siteConfig.description},
        {property: 'og:site_name', content: siteConfig.name},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: url},
        {property: 'og:title', content: siteConfig.name},
        {property: 'og:description', content: siteConfig.description},
        {property: 'og:image', content: image},
        {property: 'og:image:type', content: 'image/png'},
        {property: 'og:image:width', content: '1200'},
        {property: 'og:image:height', content: '630'},
        {property: 'og:image:alt', content: siteConfig.name},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:url', content: url},
        {name: 'twitter:title', content: siteConfig.name},
        {name: 'twitter:description', content: siteConfig.description},
        {name: 'twitter:image', content: image},
        {name: 'twitter:image:alt', content: siteConfig.name},
    ];
}

export function missingPageMetaTags(title: string) {
    return {
        meta: [
            {title: `${title} | ${siteConfig.name}`},
            {name: 'robots', content: 'noindex'},
        ],
    };
}
