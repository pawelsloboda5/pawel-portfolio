# Portfolio Projects Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 15 new projects to the portfolio website, reorganize the project hierarchy (promote some to featured, add new "other" projects), and update all supporting data files.

**Architecture:** The portfolio uses hardcoded TypeScript arrays in `src/data/` with types in `src/types/`. Featured projects get full showcase treatment (image, outcomes, features, alternating layout). Other projects get card-grid treatment. We'll add new entries to both arrays, add new links to `links.ts`, and optionally add a category/filter system for the expanded project list.

**Tech Stack:** Astro 5, React 19, TypeScript, Tailwind CSS 4

---

## Project Inventory & Classification

### Current State (9 projects)
**Featured (3):** SIE Wellness, Apicus.io, SecuSpark
**Other (6):** Healthcare Cost Navigator, DigitizeMD, NPI Lookup MCP, RustHax, ML Trading Strategy, CalWORKs Analysis

### Target State (24 projects)
After research of all 21 `.md` documents, here is the recommended organization:

#### FEATURED PROJECTS (6 total) — the flagship showcase pieces
These have live URLs, strong metrics, and represent the highest-impact work:

| # | Project | Status | Rationale |
|---|---------|--------|-----------|
| 1 | **SIE Wellness** | EXISTING | Flagship AI healthcare platform, 100K+ impressions |
| 2 | **Apicus.io** | EXISTING | AI automation ROI platform, 50+ beta users |
| 3 | **SecuSpark** | EXISTING | Gamified SaaS, 1,000+ MAU |
| 4 | **MissionIndex** | NEW | Enterprise AI for gov/DoD SharePoint, 42K+ records, GPT-5.2, monorepo |
| 5 | **FieldLiaison** | NEW | Full-stack CRM SaaS, 105K+ LOC in 22 days, 9M+ NPI records |
| 6 | **FreemanFiling** | NEW | AI Medicaid filing automation across 25 states, Playwright browser agent |

#### OTHER NOTEWORTHY PROJECTS (18 total)
| # | Project | Status | Category |
|---|---------|--------|----------|
| 1 | Healthcare Cost Navigator | EXISTING | AI / Data |
| 2 | DigitizeMD | EXISTING | Web App |
| 3 | NPI Lookup MCP Server | EXISTING | AI / Tooling |
| 4 | RustHax | EXISTING | ML / Computer Vision |
| 5 | ML Trading Strategy | EXISTING | ML / Finance |
| 6 | CalWORKs Data Analysis | EXISTING | Data Analysis |
| 7 | **Seekle Lead Gen** | NEW | AI SaaS / Pipeline |
| 8 | **CyberCane** | NEW | AI / Cybersecurity |
| 9 | **CPR Metro** | NEW | Marketing / CRO |
| 10 | **Algo Trading Bot (MCL Futures)** | NEW | Quant Finance |
| 11 | **Cursor Prompt+** | NEW | AI / Dev Tooling |
| 12 | **Healthcare Pricing Pipeline** | NEW | Data Engineering |
| 13 | **Medicaid Form Scraper** | NEW | Data Pipeline / Automation |
| 14 | **SIE Data Pipeline** | NEW | Multi-Agent AI |
| 15 | **Faceless Automation (Video)** | NEW | AI / Content Gen |
| 16 | **Apicus Scrape** | NEW | AI / Data Extraction |
| 17 | **O*NET Occupation Pipeline** | NEW | ETL / Data Pipeline |
| 18 | **LinkedIn Alumni Scraper** | NEW | Automation / Data |

#### EXCLUDED from portfolio (3 documents)
| Doc | Reason |
|-----|--------|
| `random-python-scripts.md` | Actually the NPPES ETL pipeline — impressive, but overlaps with SIE Data Pipeline and Healthcare Pricing. Merge key metrics into SIE Wellness story instead. |
| `SIE-Wellness-sie-frontend-2.md` | More detailed version of already-featured SIE Wellness. Use to enrich existing featured entry. |
| `videoAutomation-faceless-automation.md` | Evolved version of FacelessAutomation. Consolidate into single "Faceless Automation" entry. |

---

## Task 1: Update `links.ts` with new project URLs

**Files:**
- Modify: `src/data/links.ts`

**Step 1: Add new links**

Add the following to `links.ts`:

```typescript
// In companyLinks, add:
export const companyLinks = {
  // ... existing entries ...
  MissionIndex: undefined, // Private demo
  FieldLiaison: undefined, // Private
  FreemanFiling: 'https://freemanfiling.io',
  CPRMetro: 'https://www.cprmetro.org',
  SecuSpark: 'https://secuspark.com',
} as const;

export const projectGithubLinks = {
  // ... existing entries ...
  CyberCane: 'https://github.com/pawelsloboda5/UMBC-hackathon',
  // All others are private repos — no githubUrl
} as const;
```

**Step 2: Verify no TypeScript errors**

Run: `cd pawel-portfolio && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/data/links.ts
git commit -m "feat: add new project links for portfolio expansion"
```

---

## Task 2: Enrich existing SIE Wellness featured entry with deeper data

**Files:**
- Modify: `src/data/featuredProjects.ts`

**Step 1: Update SIE Wellness entry**

Update the SIE Wellness entry in `featuredProjects.ts` to incorporate richer data from the detailed `SIE-Wellness-sie-frontend-2.md` doc:

```typescript
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
  githubUrl: undefined,
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
}
```

**Step 2: Verify no TypeScript errors**

Run: `cd pawel-portfolio && npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/data/featuredProjects.ts
git commit -m "feat: enrich SIE Wellness featured entry with deeper platform data"
```

---

## Task 3: Add 3 new featured projects (MissionIndex, FieldLiaison, FreemanFiling)

**Files:**
- Modify: `src/data/featuredProjects.ts`

**Step 1: Add MissionIndex to featured projects array**

Append after the SecuSpark entry:

```typescript
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
```

**Step 2: Verify no TypeScript errors**

Run: `cd pawel-portfolio && npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/data/featuredProjects.ts
git commit -m "feat: add MissionIndex, FieldLiaison, FreemanFiling as featured projects"
```

---

## Task 4: Add 12 new "Other Noteworthy" projects

**Files:**
- Modify: `src/data/otherProjects.ts`

**Step 1: Add new projects to the otherProjects array**

Append these entries after the existing CalWORKs entry:

```typescript
{
  id: 'seekle-lead-gen',
  title: 'Seekle Lead Gen Platform',
  description: 'AI-powered B2B lead generation with 21+ autonomous LLM agents in a 7-stage DAG pipeline. Scrapes LinkedIn, Reddit, Google Maps, and 10+ sources with Thompson Sampling optimization. 160K+ LOC deployed on AWS ECS Fargate.',
  techStack: ['Next.js 16', 'FastAPI', 'CrewAI', 'PostgreSQL', 'pgvector', 'AWS ECS', 'Redis'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'cybercane',
  title: 'CyberCane – AI Phishing Detection',
  description: 'Privacy-first phishing detection for healthcare email security. Neuro-symbolic pipeline combining deterministic rules (~12ms) with RAG + OWL ontology reasoning (~487ms). 99.5% precision, 0% PHI exposure. Built in a 22-hour hackathon.',
  techStack: ['Next.js 15', 'FastAPI', 'PostgreSQL', 'pgvector', 'RDFLib', 'OpenAI', 'Docker'],
  githubUrl: projectGithubLinks.CyberCane,
  externalUrl: 'https://www.loom.com/share/bbf84dcad8484863bbf4febc4674518b'
},
{
  id: 'cpr-metro',
  title: 'CPR Metro',
  description: 'Conversion-optimized Next.js landing page for on-site CPR training. Multi-step lead capture, 40+ programmatic city pages, ~280 service-x-city cross-pages, OKLCH design system, and 5-layer CTA architecture backed by CRO research.',
  techStack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Radix UI', 'Framer Motion', 'Three.js', 'MDX'],
  githubUrl: undefined,
  externalUrl: 'https://www.cprmetro.org'
},
{
  id: 'algo-trading-bot',
  title: 'Algo Trading Bot (MCL Futures)',
  description: 'End-to-end algorithmic trading system for Micro WTI Crude Oil futures on CME Globex. Mean reversion strategy optimized through a 9-stage research process. +74.6% return, 1.40 Sharpe ratio, with live paper trading via Interactive Brokers.',
  techStack: ['Python', 'pandas', 'NumPy', 'Numba', 'Plotly', 'Dash', 'Databento', 'IB API'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'cursor-prompt-plus',
  title: 'Cursor Prompt+',
  description: 'AI prompt optimization system — VS Code/Cursor extension + FastAPI backend using Stanford DSPy 3.0 MIPROv2 compilation. Clipboard-first workflow: copy prompt, press keybind, get optimized prompt. 84% quality score on 232-example dataset.',
  techStack: ['TypeScript', 'VS Code API', 'FastAPI', 'DSPy 3.0', 'OpenAI', 'Docker', 'Pydantic'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'healthcare-pricing-pipeline',
  title: 'Healthcare Pricing Data Pipeline',
  description: 'Cloud-native ETL processing 3.7B+ records from 136 insurance plans via AWS Fargate Spot. Medallion architecture on S3 with streaming JSON (800MB+ files using <100MB RAM). 8.3x throughput speedup. Total cost: ~$9.50 for a 7-day run.',
  techStack: ['Python', 'PySpark', 'AWS Fargate', 'S3', 'Athena', 'Docker', 'PyArrow', 'ijson'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'medicaid-form-scraper',
  title: 'Medicaid Form Scraper',
  description: 'Multi-state Medicaid form monitoring pipeline tracking 42+ PDFs across 16 states. SHA-256 change detection, AWS Textract OCR, multi-stage field extraction, and 3-layer QA. Extracts 9,400+ structured fields at ~$5/month.',
  techStack: ['Python', 'AWS Textract', 'ECS Fargate', 'Terraform', 'DynamoDB', 'S3', 'Pydantic'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'sie-data-pipeline',
  title: 'SIE Data Pipeline',
  description: 'Multi-agent AI data extraction pipeline with 6 specialized parallel agents that transform unstructured healthcare provider websites into structured JSON. ~6x throughput via concurrent execution, <5% failure rate with retry resilience.',
  techStack: ['Python', 'Azure OpenAI', 'Pydantic', 'MongoDB', 'Jina AI', 'ThreadPoolExecutor'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'faceless-automation',
  title: 'Faceless Automation',
  description: 'AI video generation pipeline transforming text themes into short-form videos for social media. Orchestrates GPT-4o ideation with WAN 2.1 diffusion models (14B params) via ComfyUI. ~70-90 videos/day in continuous mode, 20x productivity gain.',
  techStack: ['Python', 'PyTorch', 'ComfyUI', 'OpenAI', 'FFmpeg', 'Hugging Face', 'CUDA'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'apicus-scrape',
  title: 'Apicus Scrape',
  description: 'AI pricing intelligence pipeline — captures SaaS pricing page screenshots via Jina AI, processes through Azure OpenAI Vision with strict structured outputs (147 JSON Schema definitions, 100% compliance). Replaces ~10 hours of manual extraction.',
  techStack: ['Python', 'Azure OpenAI Vision', 'Pydantic', 'Jina AI', 'GCS', 'Pillow'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'onet-pipeline',
  title: 'O*NET Occupation Pipeline',
  description: 'ETL pipeline scraping and enriching the entire U.S. O*NET occupation database (~1,000 occupations). Advanced text processing with 13 regex parsers, 22 Pydantic models, deterministic task categorization (165 keyword patterns), and Azure OpenAI embeddings.',
  techStack: ['Python', 'Pydantic', 'Azure OpenAI', 'Cosmos DB', 'Jina AI', 'MongoDB'],
  githubUrl: undefined,
  externalUrl: undefined
},
{
  id: 'linkedin-alumni-scraper',
  title: 'LinkedIn Alumni Intelligence',
  description: 'Automated LinkedIn profile discovery and extraction for NDU alumni. Combines Selenium browser automation with OpenAI Vision API for intelligent profile parsing. Discovered 2,628 URLs from 18,117 graduates, extracted 689 detailed profiles.',
  techStack: ['Python', 'Selenium', 'OpenAI Vision', 'pandas', 'Google Sheets API', 'Pydantic'],
  githubUrl: undefined,
  externalUrl: undefined
}
```

**Step 2: Verify no TypeScript errors**

Run: `cd pawel-portfolio && npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/data/otherProjects.ts
git commit -m "feat: add 12 new other noteworthy projects to portfolio"
```

---

## Task 5: Add CyberCane link to `projectGithubLinks`

**Files:**
- Modify: `src/data/links.ts`

**Step 1: Add CyberCane GitHub link**

Add to `projectGithubLinks`:

```typescript
export const projectGithubLinks = {
  HealthCareNavigator: 'https://github.com/pawelsloboda5/Healthcare-Cost-Navigator',
  NPILookupMCP: 'https://github.com/pawelsloboda5/NPI_Lookup_MCP_Server',
  RustHax: 'https://github.com/pawelsloboda5/rust-YOLOv8-PlayerDetection',
  MLTradingStrategy: 'https://github.com/pawelsloboda5/ML-Trading-Strategy',
  CalworksAnalysis: 'https://github.com/pawelsloboda5/calworks-analysis',
  CyberCane: 'https://github.com/pawelsloboda5/UMBC-hackathon',
} as const;
```

**Step 2: Add CPR Metro and FreemanFiling to companyLinks**

```typescript
export const companyLinks = {
  sie2: 'https://www.sie2.com/copilot',
  adobe: 'https://www.adobe.com',
  ndu: 'https://www.ndu.edu',
  HealthCareNavigator: 'https://healthcare-cost-navigator.vercel.app/',
  DigitizeMD: 'https://www.digitizemd.com/',
  SecuSparkoffline_PWA: 'https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps/',
  CPRMetro: 'https://www.cprmetro.org',
  FreemanFiling: 'https://freemanfiling.io',
} as const;
```

**Step 3: Verify no TypeScript errors**

Run: `cd pawel-portfolio && npx tsc --noEmit`

**Step 4: Commit**

```bash
git add src/data/links.ts
git commit -m "feat: add CyberCane, CPR Metro, FreemanFiling links"
```

---

## Task 6: Add project category filter system

Since we now have 18 "other" projects, a filter helps visitors find what they care about.

**Files:**
- Create: `src/types/projectCategory.ts`
- Modify: `src/types/otherProject.ts`
- Modify: `src/data/otherProjects.ts`
- Modify: `src/components/OtherProjects.astro`

**Step 1: Create category type**

Create `src/types/projectCategory.ts`:

```typescript
export type ProjectCategory =
  | 'All'
  | 'AI / ML'
  | 'Web Apps'
  | 'Data Engineering'
  | 'Automation'
  | 'Finance';
```

**Step 2: Add category field to OtherProject type**

In `src/types/otherProject.ts`, add:

```typescript
import type { ProjectCategory } from './projectCategory';

export interface OtherProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  externalUrl?: string;
  category: ProjectCategory;
}
```

**Step 3: Add category to every project in otherProjects.ts**

Add `category` field to each project:
- Healthcare Cost Navigator → `'AI / ML'`
- DigitizeMD → `'Web Apps'`
- NPI Lookup MCP → `'AI / ML'`
- RustHax → `'AI / ML'`
- ML Trading Strategy → `'Finance'`
- CalWORKs Analysis → `'Data Engineering'`
- Seekle Lead Gen → `'AI / ML'`
- CyberCane → `'AI / ML'`
- CPR Metro → `'Web Apps'`
- Algo Trading Bot → `'Finance'`
- Cursor Prompt+ → `'AI / ML'`
- Healthcare Pricing Pipeline → `'Data Engineering'`
- Medicaid Form Scraper → `'Data Engineering'`
- SIE Data Pipeline → `'AI / ML'`
- Faceless Automation → `'Automation'`
- Apicus Scrape → `'Automation'`
- O*NET Pipeline → `'Data Engineering'`
- LinkedIn Alumni Scraper → `'Automation'`

**Step 4: Create a ProjectFilter React component**

Create `src/components/ProjectFilter.tsx`:

```tsx
import { useState } from 'react';
import type { ProjectCategory } from '../types/projectCategory';

const categories: ProjectCategory[] = [
  'All',
  'AI / ML',
  'Web Apps',
  'Data Engineering',
  'Automation',
  'Finance'
];

interface Props {
  onFilter: (category: ProjectCategory) => void;
}

export default function ProjectFilter({ onFilter }: Props) {
  const [active, setActive] = useState<ProjectCategory>('All');

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => { setActive(cat); onFilter(cat); }}
          className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 border ${
            active === cat
              ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] border-[var(--color-accent-primary)]'
              : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
```

**Step 5: Create a FilterableProjectGrid React component**

Create `src/components/FilterableProjectGrid.tsx`:

```tsx
import { useState } from 'react';
import type { OtherProject } from '../types/otherProject';
import type { ProjectCategory } from '../types/projectCategory';
import ProjectFilter from './ProjectFilter';
import ProjectCard from './ProjectCard';

interface Props {
  projects: OtherProject[];
}

export default function FilterableProjectGrid({ projects }: Props) {
  const [category, setCategory] = useState<ProjectCategory>('All');

  const filtered = category === 'All'
    ? projects
    : projects.filter((p) => p.category === category);

  return (
    <>
      <ProjectFilter onFilter={setCategory} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            delay={i * 50}
          />
        ))}
      </div>
    </>
  );
}
```

**Step 6: Update OtherProjects.astro to use the filterable grid**

Replace the static grid in `OtherProjects.astro` with:

```astro
---
import { otherProjects } from '../data/otherProjects';
import FilterableProjectGrid from './FilterableProjectGrid';
---

<FilterableProjectGrid projects={otherProjects} client:load />
```

**Step 7: Verify build works**

Run: `cd pawel-portfolio && npm run build`
Expected: Build succeeds

**Step 8: Commit**

```bash
git add src/types/projectCategory.ts src/types/otherProject.ts src/data/otherProjects.ts src/components/ProjectFilter.tsx src/components/FilterableProjectGrid.tsx src/components/OtherProjects.astro
git commit -m "feat: add category filter system for other projects grid"
```

---

## Task 7: Update the "Other Projects" section heading and "show more" pattern

With 18 projects, showing all at once is overwhelming. Show 6 by default with a "Show More" toggle.

**Files:**
- Modify: `src/components/FilterableProjectGrid.tsx`

**Step 1: Add show-more toggle**

Update `FilterableProjectGrid.tsx` to show 6 initially:

```tsx
import { useState } from 'react';
import type { OtherProject } from '../types/otherProject';
import type { ProjectCategory } from '../types/projectCategory';
import ProjectFilter from './ProjectFilter';
import ProjectCard from './ProjectCard';

interface Props {
  projects: OtherProject[];
  initialCount?: number;
}

export default function FilterableProjectGrid({ projects, initialCount = 6 }: Props) {
  const [category, setCategory] = useState<ProjectCategory>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = category === 'All'
    ? projects
    : projects.filter((p) => p.category === category);

  const visible = showAll ? filtered : filtered.slice(0, initialCount);
  const hasMore = filtered.length > initialCount;

  return (
    <>
      <ProjectFilter onFilter={(cat) => { setCategory(cat); setShowAll(false); }} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            delay={i * 50}
          />
        ))}
      </div>
      {hasMore && !showAll && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="font-mono text-sm text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)] rounded px-7 py-4 hover:bg-[rgba(167,139,250,0.1)] transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
}
```

**Step 2: Verify build**

Run: `cd pawel-portfolio && npm run build`

**Step 3: Commit**

```bash
git add src/components/FilterableProjectGrid.tsx
git commit -m "feat: add show-more toggle for other projects grid"
```

---

## Task 8: Update chatbot data with new projects

**Files:**
- Modify: `src/data/chatbotData.ts`

**Step 1: Read current chatbot data**

Read and understand the chatbot data structure.

**Step 2: Add new project summaries**

Add the new projects to whatever data structure the chatbot uses so the AI assistant can answer questions about all 24 projects.

**Step 3: Commit**

```bash
git add src/data/chatbotData.ts
git commit -m "feat: update chatbot knowledge base with all new projects"
```

---

## Task 9: Verify full build and visual check

**Step 1: Run full build**

Run: `cd pawel-portfolio && npm run build`
Expected: Build succeeds with no errors

**Step 2: Run dev server and visual check**

Run: `cd pawel-portfolio && npm run dev`

Verify:
- [ ] 6 featured projects display correctly with alternating layout
- [ ] New featured projects show gradient backgrounds (no images yet)
- [ ] "Other Noteworthy Projects" section shows 6 projects initially
- [ ] Category filter buttons work and filter correctly
- [ ] "Show More" reveals remaining projects
- [ ] Mobile layout looks correct
- [ ] All external links work (CPR Metro, FreemanFiling, CyberCane demo)
- [ ] Chatbot can answer about new projects

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio expansion — 24 projects total"
```

---

## Summary of Changes

| Metric | Before | After |
|--------|--------|-------|
| Featured Projects | 3 | 6 |
| Other Projects | 6 | 18 |
| **Total Projects** | **9** | **24** |
| Category Filter | No | Yes (6 categories) |
| Show More Toggle | No | Yes (6 visible default) |
| New Files | — | 3 (`projectCategory.ts`, `ProjectFilter.tsx`, `FilterableProjectGrid.tsx`) |
| Modified Files | — | 5 (`links.ts`, `featuredProjects.ts`, `otherProjects.ts`, `otherProject.ts`, `OtherProjects.astro`, `chatbotData.ts`) |

---

## Execution Notes

- **No screenshots needed** for new featured projects — the existing `imageGradient` fallback pattern handles this gracefully
- All new featured projects use gradient backgrounds matching the site's purple theme
- The category filter uses the site's existing CSS variables and design system
- The `ProjectCard.tsx` component already supports the `OtherProject` interface — no changes needed there
- The `FilterableProjectGrid` wraps existing `ProjectCard` components, preserving all hover animations and stagger effects
