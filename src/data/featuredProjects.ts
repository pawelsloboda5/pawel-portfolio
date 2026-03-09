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
    description: `An AI-powered healthcare discovery platform helping uninsured Americans find affordable care across the DMV area. Combines a multi-turn AI Copilot with dual-collection semantic vector search (50K+ provider services), a 6-agent parallel data extraction pipeline, and programmatic SEO. Adopted by caseworkers and shelters across Washington D.C. with 100K+ Google impressions in 3 weeks.`,
    mobileDescription: `An AI-powered platform helping uninsured users find affordable healthcare. Features an AI Copilot with semantic search across 50K+ services, adopted by shelters and caseworkers across D.C.`,
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
      'Multi-agent data extraction pipeline (6 parallel AI agents)',
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
  },
  {
    id: 'missionindex',
    title: 'MissionIndex',
    tagline: 'AI Middleware for Government SharePoint',
    description: `An AI-powered middleware engine for government SharePoint environments that routes natural language queries to structured data, semantic document search, and deep analysis tools. Features a 4-tool AI engine with NL-to-SQL translation, RAG over 25,566 vector-embedded document chunks with sub-100ms HNSW lookups, and a 10-panel Agent Builder for non-technical admins. Built as a monorepo with an Art Deco landing page and Fluent UI v9 agent dashboard.`,
    mobileDescription: `AI middleware for government SharePoint — routes natural language queries to structured data and semantic document search. Features NL-to-SQL, RAG over 25K+ document chunks, and a 10-panel no-code Agent Builder.`,
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Neon Postgres',
      'pgvector',
      'OpenAI GPT-5',
      'Drizzle ORM',
      'Turborepo'
    ],
    liveUrl: '',
    githubUrl: undefined,
    imageUrl: undefined,
    imageGradient: { from: '#1e3a5f', to: '#0d1b2a' },
    outcomes: [
      '42,455+ records across 17 database tables (16,889 structured + 25,566 embedded chunks)',
      '~76ms average vector query time on 25K+ chunks via HNSW index',
      'Live demo presented to prospective DoD client (VG Systems)'
    ],
    features: [
      '4-tool AI engine with GPT-5-mini query router',
      'Natural language to SQL with AST-based injection prevention',
      'RAG semantic search with sub-100ms HNSW lookups',
      '10-panel Agent Builder admin dashboard',
      'Art Deco landing + Fluent UI v9 app (dual UI)'
    ]
  },
  {
    id: 'fieldliaison',
    title: 'FieldLiaison',
    tagline: 'Enterprise CRM for Medical Field Sales',
    description: `A full-stack, enterprise-grade CRM platform for medical field sales reps and managers. Features territory management over 9M+ NPI provider records with PostGIS spatial queries, route optimization, real-time activity tracking across 7 activity types, Stripe subscription billing, Salesforce bidirectional sync, and offline-first PWA support. 105,800+ lines of TypeScript built solo in 22 days.`,
    mobileDescription: `Enterprise CRM for medical field sales — territory management over 9M+ NPI records, route optimization, Stripe billing, Salesforce sync, and offline-first PWA. 105K+ lines built in 22 days.`,
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'PostGIS',
      'Stripe',
      'Supabase'
    ],
    liveUrl: '',
    githubUrl: undefined,
    imageUrl: undefined,
    imageGradient: { from: '#1a4731', to: '#0f2b1d' },
    outcomes: [
      '105,800+ lines of TypeScript built solo in approximately 22 days',
      '9M+ NPI provider records with PostGIS spatial queries at O(log n) performance',
      '96 REST API endpoints, 47 Prisma models, 114 database indexes'
    ],
    features: [
      'Territory management with 9M+ NPI provider search',
      'Route optimization with TSP-based stop sequencing',
      'Salesforce bidirectional CRM sync (outbox pattern)',
      'Stripe billing with 3 tiers and 14-day trial',
      'Offline-first PWA with IndexedDB sync queue'
    ]
  },
  {
    id: 'freemanfiling',
    title: 'FreemanFiling',
    tagline: 'AI-Powered Medicaid Filing Automation',
    description: `An AI-powered Medicaid enrollment platform that guides users through multilingual intake wizards and autonomously submits applications on real government portals across 25 U.S. states using a Playwright-based filing agent. Features ARIA-only portal automation (no computer vision), PII isolation architecture where the LLM never sees sensitive data, 20-language support including RTL, and a streaming voice assistant.`,
    mobileDescription: `AI-powered Medicaid filing automation across 25 U.S. states. Playwright-based agent navigates real government portals with ARIA-only automation. 20-language support and PII isolation architecture.`,
    techStack: [
      'Next.js 15',
      'React 19',
      'FastAPI',
      'Playwright',
      'Azure OpenAI',
      'Cosmos DB',
      'Prisma',
      'Docker'
    ],
    liveUrl: 'https://freemanfiling.io',
    githubUrl: undefined,
    imageUrl: undefined,
    imageGradient: { from: '#3b1d6e', to: '#1a0d33' },
    outcomes: [
      '25 U.S. states supported with autonomous portal filing',
      '20 languages including RTL (Arabic, Farsi, Urdu)',
      '316 reusable React components, 61 Prisma database models'
    ],
    features: [
      'Autonomous Playwright filing agent on government portals',
      'PII isolation — LLM never sees sensitive data',
      '4-stage discovery crawler for portal form structures',
      'Streaming voice assistant (Azure Speech SDK)',
      'DocuSign-style e-signature ceremony'
    ]
  }
];
