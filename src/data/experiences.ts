/**
 * Work Experience Data
 * Contains actual work history entries
 */

import type { Experience } from '../types/experience';

export const experiences: Experience[] = [
  {
    company: 'Social Impact Enterprise',
    title: 'Full-Stack Software Engineer',
    duration: 'May 2025 - August 2025',
    location: 'Washington, DC',
    url: 'https://www.sie2.com',
    description: [
      'Built an AI-driven health-access platform mining 3k+ DMV providers (50k+ services), powering CareFind used by 2 shelters & 30+ caseworkers',
      'Deployed Cosmos DB vCore + Azure OpenAI embeddings for sub-second semantic search, cutting RU costs 38%',
      'Designed a TypeScript + Python agent framework where LLMs extract insurance/SSN/free-service data with 92% F1, auto-refreshed nightly',
      'Refactored Next.js 15 / React 19 front end with shadcn/ui + Tailwind, boosting a11y from 71 → 98 and FCP to 1.2s',
      'Launched programmatic SEO engine with 3.5k+ indexed pages, driving 100k+ Google impressions in 3 weeks'
    ]
  },
  {
    company: 'National Defense University (DoD)',
    title: 'Software Engineer',
    duration: 'March 2025 - June 2025',
    location: 'Washington, DC',
    url: undefined,
    description: [
      'Started contract with 3 months left and led Windows 7 → 11 migration across 80 laptops for cyber warfare simulations, with Windows & Ubuntu VM environments',
      'Automated cybersecurity toolchain setup (Kali, Metasploit, Wireshark, John the Ripper) with .bat scripts',
      'Built a local RAG bot (Python, LangChain, Llama, vector DB) integrated with SharePoint for instant document access',
      'Engineered Selenium + BeautifulSoup4 bot with OpenAI to cross-reference 17k graduates, extracting 10k structured alumni profiles'
    ]
  },
  {
    company: 'Adobe',
    title: 'Machine Learning Engineer Intern',
    duration: 'May 2024 - August 2024',
    location: 'San Jose, CA',
    url: 'https://www.adobe.com',
    description: [
      'Developed an ML pipeline integrating 1.5M+ data points from multiple Adobe analytics dashboards',
      'Engineered success metrics and activity-to-adoption mappings for predictive modeling of user engagement',
      'Optimized hyperparameter tuning for an XGBoost model processing 100M+ rows, achieving a 40% reduction in processing time within 3 months',
      'Delivered reporting tool that transformed analytics into insights for leadership'
    ]
  },
  {
    company: 'Adobe',
    title: 'Business Development Representative Intern',
    duration: 'May 2023 - August 2023',
    location: 'San Jose, CA',
    url: 'https://www.adobe.com',
    description: [
      'Automated AI-driven email campaigns (+18% outreach), qualified 300+ enterprise leads, and boosted engagement +46% with targeted strategies',
      'Built and executed targeted outreach strategies to identify and engage with enterprise prospects',
      'Collaborated with sales teams to optimize lead qualification processes and improve conversion rates'
    ]
  }
];
