/**
 * Centralized Links
 * Contains all external URLs used throughout the portfolio
 */

export const socialLinks = {
  github: 'https://github.com/pawelsloboda5',
  linkedin: 'https://www.linkedin.com/in/pawel-sloboda-383181216/',
  twitter: 'https://twitter.com/pawelsloboda',
  email: 'mailto:pawelsloboda5@gmail.com',
  resume: '/FULL-STACK-AZURE-ENGINEER-PAWEL-SLOBODA.pdf'
} as const;

export const companyLinks = {
  sie2: 'https://www.sie2.com/copilot',
  adobe: 'https://www.adobe.com',
  ndu: 'https://www.ndu.edu'
} as const;

export type SocialLinks = typeof socialLinks;
export type CompanyLinks = typeof companyLinks;
