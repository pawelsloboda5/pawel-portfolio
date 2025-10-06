/**
 * Featured Projects Data
 * Contains the actual featured project entries for portfolio display
 */

import type { FeaturedProject } from '../types/project';
import { companyLinks } from './links';

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'sie-wellness',
    title: 'SIE Wellness',
    tagline: 'AI Copilot for Health Access',
    description: `An AI-driven health-access platform designed to help uninsured and low-income users find free or low-cost medical care across the DMV area. The system combines semantic search, vector embeddings, and an AI Copilot chat assistant to guide users to the best clinics, hospitals, or providers for their needs. Adopted by caseworkers across Washington D.C. With 100K+ Google impressions in 3 weeks.`,
    mobileDescription: `An AI-driven platform helping uninsured users find free or low-cost medical care across the DMV area. Combines semantic search and AI chat to guide users to the right providers. Adopted by caseworkers across Washington D.C.`,
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Azure OpenAI',
      'Azure Cosmos DB',
      'Docker',
      'Python'
    ],
    liveUrl: 'https://www.sie2.com',
    githubUrl: undefined, // Private repository
    imageUrl: '/sie2-photo.png',
    outcomes: [
      'Adopted by 2 shelters and 30+ caseworkers across Washington D.C.',
      'Indexed 3,500+ programmatic pages, achieving 100K+ Google impressions in 3 weeks',
      'Reduced query latency from 300ms to <150ms and Cosmos DB RU cost by 38%'
    ],
    features: [
      'AI Copilot Chat with retrieval-augmented generation',
      'Semantic search across 50K+ provider services',
      'Dynamic knowledge graph for medical service filtering',
      'SEO automation for programmatic pages',
      'Nightly data refresh pipeline'
    ]
  },
  {
    id: 'apicus',
    title: 'Apicus.io',
    tagline: 'Automation ROI & AI Recommender System',
    description: `An AI-powered automation ROI intelligence platform that helps companies calculate return on investment for workflow automations. Uses an advanced Retrieval-Augmented Generation (RAG) system and a vector database of 500,000+ automation combinations to match use cases to the most cost-effective workflows. Increased retrieval accuracy by 50% and scaled to 50+ consultants evaluating platform.`,
    mobileDescription: `An AI-powered platform helping companies calculate ROI for workflow automations. Uses RAG and a vector database of 500,000+ automation combinations to match use cases to cost-effective workflows. Scaled to 50+ beta users across 3 agencies.`,
    techStack: [
      'Next.js 15',
      'FastAPI',
      'Python',
      'Azure OpenAI',
      'MongoDB Atlas',
      'LangChain',
      'Docker'
    ],
    liveUrl: 'https://apicus.io',
    githubUrl: undefined, // Private repository
    imageUrl: '/apicus-photo.png',
    outcomes: [
      'Increased retrieval accuracy by 50% with vector search and hybrid filtering',
      'Reduced deployment cycle by 70% via containerized Azure pipeline',
      'Scaled platform to 50+ beta users across 3 agencies'
    ],
    features: [
      'ROI Calculator with dynamic savings computation',
      'Automation Recommender using contextual embeddings',
      'RAG Retrieval System powered by OpenAI',
      'Dashboard Analytics for automation metrics',
      'Containerized CI/CD pipeline'
    ]
  },
  {
    id: 'secuspark',
    title: 'SecuSpark',
    tagline: 'Gamified AI Security+ Exam Prep',
    description: `A gamified, AI-powered learning platform for CompTIA Security+ certification prep. Built as an <a href="${companyLinks.SecuSparkoffline_PWA}" target="_blank" rel="noopener noreferrer" class="keyword-link">offline-first progressive web app (PWA)</a>, SecuSpark provides personalized question recommendations and AI explanations running directly in the browser. Scaled to 1,000+ monthly active users with 54% increase in engagement rates through adaptive difficulty and RPG-style progression.`,
    mobileDescription: `A gamified AI-powered platform for CompTIA Security+ exam prep. Built as an <a href="${companyLinks.SecuSparkoffline_PWA}" target="_blank" rel="noopener noreferrer" class="keyword-link">offline-first PWA</a> with personalized recommendations and AI explanations. Scaled to 1,000+ monthly active users with 54% increase in engagement.`,
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'IndexedDB',
      'Responses API',
      'Tailwind CSS'
    ],
    liveUrl: 'https://secuspark.com',
    githubUrl: undefined, // Private repository
    imageUrl: '/secuspark-photo.png',
    outcomes: [
      'Scaled to 1,000+ monthly active users',
      'Boosted engagement rates with 54% increase in session duration',
      'Delivered AI-powered explanations improving retention in user testing'
    ],
    features: [
      'AI Explanations & Mnemonics for every question',
      'Adaptive Difficulty Engine based on performance',
      'Progress Analytics across Security+ domains',
      'Gamified UX with RPG-style levels and achievements',
      'Offline Mode with automatic resync'
    ]
  }
];
