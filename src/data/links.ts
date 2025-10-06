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
  ndu: 'https://www.ndu.edu',
  HealthCareNavigator: 'https://healthcare-cost-navigator.vercel.app/',
  DigitizeMD: 'https://www.digitizemd.com/'
} as const;

export const projectGithubLinks = {
  HealthCareNavigator: 'https://github.com/pawelsloboda5/Healthcare-Cost-Navigator',
  NPILookupMCP: 'https://github.com/pawelsloboda5/NPI_Lookup_MCP_Server',
  RustHax: 'https://github.com/pawelsloboda5/rust-YOLOv8-PlayerDetection',
  MLTradingStrategy: 'https://github.com/pawelsloboda5/ML-Trading-Strategy',
  CalworksAnalysis: 'https://github.com/pawelsloboda5/calworks-analysis',
} as const;

export type SocialLinks = typeof socialLinks;
export type CompanyLinks = typeof companyLinks;
export type ProjectGithubLinks = typeof projectGithubLinks;