/**
 * Other Noteworthy Projects Data
 * Contains smaller project entries based on projects.md
 */

import type { OtherProject } from '../types/otherProject';
import { companyLinks, projectGithubLinks } from './links';

export const otherProjects: OtherProject[] = [
  {
    id: 'healthcare-cost-navigator',
    title: 'Healthcare Cost Navigator',
    description: 'AI-powered tool to query U.S. hospital pricing data in plain English. Converts Medicare dataset into a conversational API with geospatial search, quality ratings, and sub-300ms query performance.',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'pgvector', 'Docker', 'OpenAI GPT-4'],
    githubUrl: projectGithubLinks.HealthCareNavigator,
    externalUrl: companyLinks.HealthCareNavigator
  },
  {
    id: 'digitizemd',
    title: 'DigitizeMD',
    description: 'Media digitization and logistics platform for converting VHS, tapes, and DVDs to MP4. Automates scheduling, payment processing, and shipping workflows with Stripe webhooks and admin dashboards.',
    techStack: ['Next.js 15', 'React 19', 'Prisma', 'PostgreSQL', 'Clerk', 'Stripe', 'Tailwind CSS'],
    githubUrl: undefined,
    externalUrl: companyLinks.DigitizeMD
  },
  {
    id: 'npi-lookup-mcp',
    title: 'NPI Lookup MCP Server',
    description: 'Production-ready Model Context Protocol (MCP) server for real-time NPI registry queries. Features multi-tier caching, fuzzy matching with RapidFuzz, and sub-500ms live calls for AI agent integration.',
    techStack: ['Python', 'Async IO', 'Pydantic', 'RapidFuzz', 'Diskcache', 'Redis', 'CMS NPPES API'],
    githubUrl: projectGithubLinks.NPILookupMCP,
    externalUrl: undefined
  },
  {
    id: 'rusthax',
    title: 'RustHax – Real-Time Object Detection',
    description: 'High-performance object detection system for live video streams targeting 60+ FPS. Custom-trained YOLOv8 achieving 95% precision with optimized pipeline and ONNX export for deployment flexibility.',
    techStack: ['Python', 'PyTorch', 'YOLOv8', 'OpenCV', 'ONNX Runtime'],
    githubUrl: projectGithubLinks.RustHax,
    externalUrl: undefined
  },
  {
    id: 'ml-trading-strategy',
    title: 'ML Trading Strategy',
    description: 'ML-driven trading strategy using Random Forest on technical indicators. End-to-end pipeline with automated data ingest, feature engineering, hyperparameter tuning, and realistic backtrader simulations.',
    techStack: ['Python', 'pandas', 'scikit-learn', 'yfinance', 'backtrader', 'Jupyter'],
    githubUrl: projectGithubLinks.MLTradingStrategy,
    externalUrl: undefined
  },
  {
    id: 'calworks-analysis',
    title: 'CalWORKs Data Analysis (San Francisco)',
    description: 'Analyzed CalWORKs eligibility and economic disparities across San Francisco using Census PUMS microdata. Config-driven pipeline with insightful visualizations identifying affordability gaps and assistance needs.',
    techStack: ['Python', 'pandas', 'numpy', 'matplotlib', 'seaborn'],
    githubUrl: projectGithubLinks.CalworksAnalysis,
    externalUrl: undefined
  }
];
