import { type SEOConfig, generateMetaTags } from './seo';

interface OgPageInfo {
  label: string;
  icon: string;
}

const pageOgMap: Record<string, OgPageInfo> = {
  home: { label: 'Portfolio', icon: '👨‍💻' },
  'work-experience': { label: 'Career', icon: '💼' },
  expertise: { label: 'Skills', icon: '🎯' },
  terminal: { label: 'Terminal', icon: '⌨️' },
  projects: { label: 'Portfolio', icon: '🚀' },
  about: { label: 'About', icon: '👤' },
  activity: { label: 'Activity', icon: '📊' },
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
    icon: pageInfo.icon,
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
