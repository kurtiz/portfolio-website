import { type SEOConfig, generateMetaTags } from './seo';

interface OgPageInfo {
  label: string;
}

const pageOgMap: Record<string, OgPageInfo> = {
  home: { label: 'Portfolio' },
  'work-experience': { label: 'Career' },
  expertise: { label: 'Skills' },
  terminal: { label: 'Terminal' },
  projects: { label: 'Portfolio' },
  about: { label: 'About' },
  activity: { label: 'Activity' },
};

export function getOgImageUrl(
  title: string,
  description: string,
  pageInfo: OgPageInfo,
  image?: string,
): string {
  const params = new URLSearchParams({
    title,
    description,
    page: pageInfo.label,
  });
  if (image) params.set('image', image);
  return `/api/og?${params.toString()}`;
}

export function generatePageMetaTags(pageKey: string, seo: SEOConfig) {
  const ogInfo = pageOgMap[pageKey];
  if (!ogInfo) {
    return generateMetaTags(seo);
  }
  const image = getOgImageUrl(seo.title, seo.description, ogInfo);
  return generateMetaTags({ ...seo, image });
}
