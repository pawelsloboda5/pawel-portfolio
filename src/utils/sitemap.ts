/**
 * Sitemap Configuration & Utilities
 * Custom sitemap helpers for programmatic page generation
 */

import { siteConfig } from './seo';

export interface SitemapEntry {
  url: string;
  lastmod?: Date;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Static pages configuration
 * Pages that exist as physical files in the project
 */
export const staticPages: SitemapEntry[] = [
  {
    url: '/',
    lastmod: new Date(),
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    url: '/FULL-STACK-AZURE-ENGINEER-PAWEL-SLOBODA.pdf',
    lastmod: new Date(),
    changefreq: 'monthly',
    priority: 0.8
  }
];

/**
 * Get all sitemap entries
 * Combines static pages with any dynamically generated pages
 */
export function getSitemapEntries(): SitemapEntry[] {
  return [
    ...staticPages
    // Add dynamic pages here if you generate any in the future
    // Example: blog posts, project detail pages, etc.
  ];
}

/**
 * Generate sitemap URL entry
 */
export function generateSitemapUrl(entry: SitemapEntry): string {
  const url = `${siteConfig.url}${entry.url}`;
  const lastmod = entry.lastmod ? entry.lastmod.toISOString().split('T')[0] : '';
  const changefreq = entry.changefreq || 'weekly';
  const priority = entry.priority !== undefined ? entry.priority : 0.7;

  return `
  <url>
    <loc>${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/**
 * Generate complete sitemap XML
 */
export function generateSitemapXml(): string {
  const entries = getSitemapEntries();
  const urls = entries.map(generateSitemapUrl).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Validate sitemap entry
 */
export function validateSitemapEntry(entry: SitemapEntry): boolean {
  // URL must start with /
  if (!entry.url.startsWith('/')) {
    console.error(`Invalid URL: ${entry.url} - must start with /`);
    return false;
  }

  // Priority must be between 0 and 1
  if (entry.priority !== undefined && (entry.priority < 0 || entry.priority > 1)) {
    console.error(`Invalid priority: ${entry.priority} - must be between 0 and 1`);
    return false;
  }

  return true;
}

/**
 * Get robots.txt content
 */
export function generateRobotsTxt(): string {
  return `# robots.txt for ${siteConfig.name}

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${siteConfig.url}/sitemap-index.xml

# Disallow admin or draft pages if any
Disallow: /drafts/
Disallow: /admin/
Disallow: /*.json$

# Crawl delay (optional)
Crawl-delay: 1
`;
}
