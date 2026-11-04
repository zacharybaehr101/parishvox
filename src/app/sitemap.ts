import type { MetadataRoute } from 'next';
import { fetchAllCathedrals, fetchAllParishes } from '@/lib/sheets';

export const revalidate = 21600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://getparishvox.com';
  const [cathedrals, parishes] = await Promise.all([fetchAllCathedrals(), fetchAllParishes()]);
  const staticPages: MetadataRoute.Sitemap = [
    '', '/search', '/cathedrals', '/dioceses', '/exemplars', '/pricing',
  ].map((path) => ({ url: `${base}${path}`, changeFrequency: 'weekly', priority: path === '' ? 1 : 0.7 }));
  return [
    ...staticPages,
    ...cathedrals.map((c) => ({
      url: `${base}/cathedral/${c.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...parishes.map((p) => ({
      url: `${base}/parish/${p.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
