/**
 * SEO Utilities
 * Helper functions and configurations for SEO optimization
 */

import { socialLinks } from '../data/links';
import { experiences } from '../data/experiences';
import { featuredProjects } from '../data/featuredProjects';

/**
 * Site Configuration
 */
export const siteConfig = {
  name: 'Pawel Sloboda',
  title: 'Pawel Sloboda | Full-Stack Software Engineer',
  description: 'Full-stack software engineer specializing in building exceptional digital experiences with modern web technologies, AI integration, and cloud infrastructure.',
  url: 'https://pawelsloboda.dev', // Update to your actual domain
  author: 'Pawel Sloboda',
  email: 'pawelsloboda5@gmail.com',
  keywords: [
    'Full-Stack Developer',
    'Software Engineer',
    'AI Integration',
    'React',
    'Next.js',
    'TypeScript',
    'Azure OpenAI',
    'Vector Search',
    'RAG',
    'Machine Learning',
    'Web Development',
    'Cloud Infrastructure',
    'Pawel Sloboda'
  ],
  social: {
    github: socialLinks.github,
    linkedin: socialLinks.linkedin,
    email: socialLinks.email
  }
} as const;

/**
 * Generate JSON-LD structured data for Person/Profile
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Full-Stack Software Engineer',
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}/my-picture.png`,
    sameAs: [
      socialLinks.github,
      socialLinks.linkedin
    ],
    worksFor: experiences.map(exp => ({
      '@type': 'Organization',
      name: exp.company,
      ...(exp.url && { url: exp.url })
    })),
    knowsAbout: [
      'Full-Stack Development',
      'AI Integration',
      'Machine Learning',
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      'Azure OpenAI',
      'Vector Search',
      'Cloud Infrastructure'
    ]
  };
}

/**
 * Generate JSON-LD structured data for Website
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.name
    },
    inLanguage: 'en-US'
  };
}

/**
 * Generate JSON-LD structured data for Portfolio
 */
export function generatePortfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${siteConfig.name} - Portfolio`,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: 'Full-Stack Software Engineer'
    },
    workExample: featuredProjects.map(project => ({
      '@type': 'CreativeWork',
      name: project.title,
      description: project.tagline,
      url: project.liveUrl,
      ...(project.imageUrl && { image: `${siteConfig.url}${project.imageUrl}` })
    }))
  };
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(options: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}) {
  return {
    'og:title': options.title || siteConfig.title,
    'og:description': options.description || siteConfig.description,
    'og:type': options.type || 'website',
    'og:url': options.url || siteConfig.url,
    'og:image': options.image || `${siteConfig.url}/portfolio-logo.png`,
    'og:image:alt': `${siteConfig.name} - Full-Stack Software Engineer`,
    'og:site_name': siteConfig.name
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(options: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': options.title || siteConfig.title,
    'twitter:description': options.description || siteConfig.description,
    'twitter:image': options.image || `${siteConfig.url}/portfolio-logo.png`,
    'twitter:image:alt': `${siteConfig.name} - Full-Stack Software Engineer`
  };
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string = ''): string {
  return `${siteConfig.url}${path}`;
}

/**
 * Generate meta keywords string
 */
export function generateKeywords(): string {
  return siteConfig.keywords.join(', ');
}
