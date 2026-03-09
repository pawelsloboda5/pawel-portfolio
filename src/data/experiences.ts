/**
 * Work Experience Data
 * Contains actual work history entries
 */

import type { Experience } from '../types/experience';

export const experiences: Experience[] = [
  {
    company: 'FreemanFiling',
    title: 'Sole Developer & Architect',
    duration: 'December 2025 - March 2026',
    location: 'Remote',
    url: 'https://freemanfiling.io',
    description: [
      'Built an AI-powered Medicaid enrollment platform automating government benefits applications across 25 U.S. states in 20 languages on Azure Container Apps',
      'Designed an autonomous Playwright filing agent using ARIA accessibility trees — ~90% of portal fields handled without LLM calls, Claude Sonnet 4.5 for edge cases',
      'Engineered PII-isolation architecture where the LLM never sees actual sensitive data — HIPAA compliant with automatic PII redaction in all logs',
      'Built a 4-stage discovery crawler reverse-engineering state portal forms into YAML mappings with checkpoint/resume surviving container restarts',
      'Shipped streaming voice assistant (Azure Speech STT → GPT-5-nano → TTS) and 22-section admin dashboard with real-time monitoring and fraud detection'
    ]
  },
  {
    company: 'Social Impact Enterprise',
    title: 'Full-Stack Software Engineer',
    duration: 'May 2025 - November 2025',
    location: 'Washington, DC',
    url: 'https://www.sie2.com',
    description: [
      'Architected an AWS pipeline (ECS Fargate, S3, Athena, Glue) processing 3.7B+ healthcare pricing records across 136 insurance plans — 100-500x cheaper than competitors',
      'Built Python streaming JSON → Parquet processing sustaining ~630K records/sec across 14 parallel Fargate tasks with stable memory',
      'Designed a Spark compaction engine achieving 98.5% file reduction and 7,373x deduplication (110B → 15M unique records), enabling sub-3s Athena queries',
      'Created 6-agent parallel AI extraction pipeline with Pydantic schema enforcement, extracting 60+ validated fields per provider from unstructured websites',
      'Developed AI Navigator web app with GPT-4.1 conversational AI + 1,536-dim vector search across 3,000+ providers and 50,000+ services for underserved populations'
    ]
  },
  {
    company: 'National Defense University (DoD)',
    title: 'Software Engineer',
    duration: 'March 2025 - June 2025',
    location: 'Washington, DC',
    url: undefined,
    description: [
      'Led Windows 7 → 11 migration across 80 laptops for cyber warfare simulations with Windows & Ubuntu VM environments',
      'Automated deployment of Kali, Metasploit, and Wireshark across 80+ systems via PowerShell and batch scripts — 70% reduction in manual setup time',
      'Built a local RAG assistant (Python, LangChain, Llama, vector DB) integrated with SharePoint for instant offline access to lab documentation',
      'Engineered a data pipeline processing 18,117 NDU graduates, discovering 2,628 LinkedIn profiles and extracting 689 career profiles using Selenium + GPT-4 Vision'
    ]
  },
  {
    company: 'Adobe',
    title: 'Machine Learning Engineer',
    duration: 'May 2023 - August 2024',
    location: 'San Jose, CA',
    url: 'https://www.adobe.com',
    description: [
      'Built end-to-end ML pipeline integrating 1.5M+ data points from multiple Adobe analytics sources to model enterprise product adoption',
      'Engineered feature engineering pipelines turning raw telemetry into predictive models — decreased enterprise churn by 14% over 3 months',
      'Applied Random Forest and XGBoost ensemble methods on 100M+ records with 40% runtime optimization via vectorized feature computation',
      'Built FastAPI + Plotly dashboards exposing feature importance and adoption insights to leadership with automated QA/data-validation checks'
    ]
  },
  {
    company: 'Adobe',
    title: 'Business Development Representative',
    duration: 'May 2023 - August 2023',
    location: 'San Jose, CA',
    url: 'https://www.adobe.com',
    description: [
      'Automated outreach workflows with AI-driven personalization (+18% reach), improving enterprise lead engagement by 46%'
    ]
  }
];
