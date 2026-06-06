import { type SEOConfig, generateMetaTags } from './seo';

interface OgPageInfo {
  label: string;
  image?: string;
}

const profileImage = 'https://assets.iamaaronwilldjaba.me/profile.jpg';

const pageOgMap: Record<string, OgPageInfo> = {
  home: { label: 'Portfolio', image: profileImage },
  'work-experience': { label: 'Career' },
  expertise: { label: 'Skills' },
  terminal: { label: 'Terminal' },
  projects: { label: 'Portfolio' },
  about: { label: 'About', image: profileImage },
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
  const image = getOgImageUrl(seo.title, seo.description, ogInfo, ogInfo.image);
  return generateMetaTags({ ...seo, image });
}
