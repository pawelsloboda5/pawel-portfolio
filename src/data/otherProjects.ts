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
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'pgvector', 'Docker', 'AWS EC2'],
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
    techStack: ['Python', 'PyTorch', 'YOLOv8', 'OpenCV', 'ONNX Runtime','Win32 API'],
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
    techStack: ['Python', 'pandas', 'numpy', 'matplotlib', 'seaborn','PUMS data','YAML'],
    githubUrl: projectGithubLinks.CalworksAnalysis,
    externalUrl: undefined
  },
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
];
