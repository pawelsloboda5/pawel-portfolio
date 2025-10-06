/**
 * Chatbot Data
 * Contains predefined responses, quick actions, and portfolio context for the chatbot
 */

import type { QuickAction, KeywordPattern, ChatbotConfig } from '../types/chatbot';
import { experiences } from './experiences';
import { featuredProjects } from './featuredProjects';
import { otherProjects } from './otherProjects';
import { socialLinks } from './links';

/**
 * Quick Action Buttons
 * Shown when chat history is empty
 */
export const quickActions: QuickAction[] = [
  {
    id: 'view-projects',
    label: 'View Projects',
    icon: '💼',
    prompt: 'Tell me about your projects'
  },
  {
    id: 'download-resume',
    label: 'Download Resume',
    icon: '📄',
    prompt: 'How can I get your resume?'
  },
  {
    id: 'contact-info',
    label: 'Contact Me',
    icon: '📧',
    prompt: 'How can I contact you?'
  },
  {
    id: 'ask-experience',
    label: 'Ask About Experience',
    icon: '🚀',
    prompt: 'Tell me about your work experience'
  }
];

/**
 * Portfolio Context
 * Auto-generated summaries from existing data
 */
export const portfolioContext = {
  // Experience summary
  experienceSummary: experiences.map(exp => 
    `${exp.title} at ${exp.company} (${exp.duration})`
  ).join(', '),
  
  // Featured projects list
  featuredProjectsList: featuredProjects.map(proj => 
    `${proj.title}: ${proj.tagline}`
  ).join('; '),
  
  // All projects combined
  allProjects: [...featuredProjects, ...otherProjects],
  
  // Tech stack (unique list)
  techStack: Array.from(new Set([
    ...featuredProjects.flatMap(p => p.techStack),
    ...otherProjects.flatMap(p => p.techStack)
  ])),
  
  // Contact information
  contact: {
    email: socialLinks.email.replace('mailto:', ''),
    linkedin: socialLinks.linkedin,
    github: socialLinks.github,
    resume: socialLinks.resume
  }
};

/**
 * Keyword Patterns for Response Matching
 * Higher priority = checked first
 */
export const keywordPatterns: KeywordPattern[] = [
  // Projects (Priority 10)
  {
    keywords: ['project', 'projects', 'work', 'built', 'portfolio', 'build', 'created', 'made'],
    priority: 10,
    category: 'projects',
    response: `I've worked on some exciting projects! Here are my featured ones:

🏥 **SIE Wellness** - AI-powered health-access platform helping uninsured users find free/low-cost medical care. Built with Next.js, Azure OpenAI, and Cosmos DB. Adopted by 2 shelters and 30+ caseworkers.

🤖 **Apicus.io** - Automation ROI intelligence platform using RAG and vector search across 500K+ automation combinations. Increased retrieval accuracy by 50%.

🎮 **SecuSpark** - Gamified Security+ exam prep app with AI explanations. Scaled to 1,000+ monthly users with 54% engagement increase.

Want to know more about any specific project?`
  },
  
  // Specific project queries (Priority 9)
  {
    keywords: ['sie', 'wellness', 'sie2', 'health', 'healthcare', 'medical'],
    priority: 9,
    category: 'projects',
    response: `**SIE Wellness** is an AI-driven health-access platform I built to help uninsured and low-income users find free or low-cost medical care across the DMV area.

**Key Features:**
- AI Copilot chat with retrieval-augmented generation
- Semantic search across 50K+ provider services
- Dynamic knowledge graph for filtering
- Programmatic SEO (3,500+ indexed pages)

**Impact:** 
- Adopted by 2 shelters and 30+ caseworkers
- 100K+ Google impressions in 3 weeks
- Reduced query latency to <150ms

**Tech Stack:** Next.js 15, Azure OpenAI, Cosmos DB, Docker, Python

Check it out: https://www.sie2.com`
  },
  
  {
    keywords: ['apicus', 'automation', 'roi'],
    priority: 9,
    category: 'projects',
    response: `**Apicus.io** is an AI-powered automation ROI intelligence platform that helps companies calculate return on investment for workflow automations.

**Core Technology:**
- RAG system with vector database of 500,000+ automation combinations
- Matches use cases to cost-effective workflows
- Dynamic savings computation

**Results:**
- 50% increase in retrieval accuracy
- 70% reduction in deployment cycle
- Scaled to 50+ beta users across 3 agencies

**Tech Stack:** Next.js 15, FastAPI, Azure OpenAI, MongoDB Atlas, LangChain

Visit: https://apicus.io`
  },
  
  {
    keywords: ['secuspark', 'security+', 'comptia', 'exam', 'study', 'gamified'],
    priority: 9,
    category: 'projects',
    response: `**SecuSpark** is a gamified, AI-powered learning platform for CompTIA Security+ certification prep.

**Features:**
- AI explanations & mnemonics for every question
- Adaptive difficulty engine based on performance
- RPG-style progression with levels and achievements
- Offline-first PWA (works without internet)

**Success Metrics:**
- 1,000+ monthly active users
- 54% increase in engagement rates
- Improved retention through AI-powered explanations

**Tech Stack:** React, TypeScript, IndexedDB, OpenAI Responses API, Vite

Try it: https://secuspark.com`
  },
  
  // Experience (Priority 10)
  {
    keywords: ['experience', 'work', 'worked', 'job', 'jobs', 'career', 'employment', 'companies', 'company'],
    priority: 10,
    category: 'experience',
    response: `I've had the opportunity to work at some great companies:

**🚀 Social Impact Enterprise** (July 2025 - Oct 2025)
Full-Stack Software Engineer - Built AI health-access platform mining 3k+ DMV providers, deployed Cosmos DB + Azure OpenAI for semantic search.

**🇺🇸 National Defense University (DoD)** (March 2025 - June 2025)
Software Engineer - Led Windows 7→11 migration for cyber warfare simulations, built local RAG bot with SharePoint integration.

**🎨 Adobe** (May 2024 - Aug 2024)
Machine Learning Engineer Intern - Developed ML pipeline with 1.5M+ data points, optimized XGBoost model processing 100M+ rows.

**💼 Adobe** (May 2023 - Aug 2023)
Business Development Representative Intern - Automated AI-driven email campaigns, qualified 300+ enterprise leads.

Want to hear more about any specific role?`
  },
  
  // Specific company queries (Priority 9)
  {
    keywords: ['adobe', 'xgboost', 'machine learning', 'ml engineer'],
    priority: 9,
    category: 'experience',
    response: `At **Adobe**, I wore two hats across two different summers:

**Machine Learning Engineer Intern** (Summer 2024):
- Built ML pipeline integrating 1.5M+ data points from multiple analytics dashboards
- Optimized XGBoost model for 100M+ rows, achieving 40% faster processing
- Delivered reporting tool transforming analytics into leadership insights

**Business Development Representative Intern** (Summer 2023):
- Automated AI-driven email campaigns (+18% outreach)
- Qualified 300+ enterprise leads
- Boosted engagement +46% with targeted strategies

Both roles taught me the importance of combining technical skills with business impact.`
  },
  
  {
    keywords: ['defense', 'dod', 'military', 'ndu', 'cybersecurity', 'cyber'],
    priority: 9,
    category: 'experience',
    response: `At the **National Defense University (DoD)**, I worked as a Software Engineer on some critical infrastructure projects:

**Key Projects:**
- Led Windows 7→11 migration across 80 laptops for cyber warfare simulations
- Automated cybersecurity toolchain setup (Kali, Metasploit, Wireshark)
- Built local RAG bot with Python, LangChain, and Llama integrated with SharePoint
- Engineered Selenium bot with OpenAI to extract 10k+ structured alumni profiles

It was my first experience working with government security requirements and defense systems. Started with just 3 months left on the contract but delivered multiple high-impact projects.`
  },
  
  // Skills & Technologies (Priority 8)
  {
    keywords: ['skills', 'technologies', 'tech', 'stack', 'tools', 'languages', 'frameworks'],
    priority: 8,
    category: 'skills',
    response: `Here are the technologies I've been working with recently:

**Languages:**
- TypeScript / JavaScript
- Python
- SQL

**Frontend:**
- React 19 / Next.js 15
- Tailwind CSS
- Astro

**Backend:**
- FastAPI
- Node.js
- Express

**AI/ML:**
- OpenAI / Azure OpenAI
- Responses API
- LangChain
- Vector DBs / RAG

**Databases:**
- PostgreSQL / Prisma
- Azure Cosmos DB / MongoDB
- pgvector

**DevOps:**
- Docker
- GitHub Actions
- Azure Cloud

I specialize in full-stack development with a strong focus on AI integration and data engineering.`
  },
  
  {
    keywords: ['ai', 'artificial intelligence', 'openai', 'rag', 'vector', 'embeddings', 'llm'],
    priority: 9,
    category: 'skills',
    response: `I have extensive experience with **AI/ML technologies**:

**Frameworks & APIs:**
- OpenAI API & Azure OpenAI
- Responses API for streaming
- LangChain for orchestration
- Custom RAG implementations

**Vector Search:**
- Semantic search with embeddings
- pgvector, MongoDB Atlas, Cosmos DB vCore
- Sub-second query performance at scale

**Real-World Projects:**
- Built AI copilot handling 50K+ services (SIE Wellness)
- RAG system with 500K+ document combinations (Apicus)
- AI explanations for educational content (SecuSpark)

**Key Strengths:**
- Production-scale vector search optimization
- Context-aware response generation
- Real-time inference pipelines
- Cost optimization (reduced RU costs by 38%)

I love building AI systems that solve real problems, not just demos.`
  },
  
  // Contact (Priority 10)
  {
    keywords: ['contact', 'email', 'reach', 'get in touch', 'hire', 'available', 'talk', 'connect'],
    priority: 10,
    category: 'contact',
    response: `I'd love to hear from you! Here are the best ways to reach me:

📧 **Email:** pawelsloboda5@gmail.com
💼 **LinkedIn:** https://www.linkedin.com/in/pawel-sloboda-383181216/
💻 **GitHub:** https://github.com/pawelsloboda5

I'm currently looking for new opportunities and interesting projects. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!

I typically respond within 24 hours.`
  },
  
  // Resume (Priority 10)
  {
    keywords: ['resume', 'cv', 'curriculum vitae', 'download', 'pdf'],
    priority: 10,
    category: 'contact',
    response: `You can download my resume here:

📄 **[Download Resume PDF](/FULL-STACK-AZURE-ENGINEER-PAWEL-SLOBODA.pdf)**

My resume includes:
- Detailed work experience
- Technical skills and certifications
- Project highlights and impact metrics
- Education and achievements

Feel free to share it with anyone who might be interested. If you have any questions about my background, just ask!`
  },
  
  // Personal/Background (Priority 7)
  {
    keywords: ['who', 'about', 'background', 'story', 'yourself', 'you'],
    priority: 7,
    category: 'general',
    response: `Hey! I'm **Pawel Sloboda**, a software engineer who's been building things for the web since I was 12.

**My Journey:**
Started with Adobe Flash games on Kongregate that reached 50,000+ gameplays. That early experience of building something people actually used sparked a passion that shaped my entire career.

**Recent Work:**
- Built AI health platforms at a social impact startup
- Developed ML pipelines at Adobe
- Engineered cybersecurity infrastructure for the Department of Defense

**What I Do:**
I specialize in full-stack development with a focus on AI integration, vector search, and data engineering. I love tackling complex problems like semantic search across 50K+ services and real-time ML inference.

**Philosophy:**
I write code that solves problems, not resumes. My goal is to build systems that are both technically sophisticated and genuinely useful.

Want to know more about anything specific?`
  },
  
  // Greetings (Priority 5)
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'sup', 'yo'],
    priority: 5,
    category: 'general',
    response: `Hey there! 👋 I'm Pawel's AI assistant. I can help you learn more about his work, projects, and experience.

What would you like to know? Feel free to ask about:
- His projects and what he's built
- Work experience and companies he's worked with
- Technical skills and technologies he uses
- How to get in touch or download his resume

Go ahead, ask me anything!`
  },
  
  // Thanks (Priority 5)
  {
    keywords: ['thanks', 'thank you', 'appreciate', 'helpful'],
    priority: 5,
    category: 'general',
    response: `You're very welcome! 😊 

Is there anything else you'd like to know about Pawel's work or experience? I'm here to help!`
  },
  
  // Fallback (Priority 1)
  {
    keywords: [],
    priority: 1,
    category: 'general',
    response: `I'm not sure I understand that question, but I'd love to help! 

I can tell you about:
- **Projects**: SIE Wellness, Apicus.io, SecuSpark, and more
- **Experience**: Social Impact Enterprise, DoD, Adobe
- **Skills**: AI/ML, full-stack development, cloud infrastructure
- **Contact**: Email, LinkedIn, or resume download

What would you like to know?`
  }
];

/**
 * Chatbot Configuration
 */
export const chatbotConfig: ChatbotConfig = {
  maxUserMessageLength: 500,
  maxBotMessageLength: 1000,
  typingDelay: 500,
  responseDelay: 800,
  welcomeMessage: `Hey! 👋 I'm Pawel's AI assistant. I can answer questions about his projects, work experience, and skills.

Try asking me something, or choose one of the quick actions below!`
};
