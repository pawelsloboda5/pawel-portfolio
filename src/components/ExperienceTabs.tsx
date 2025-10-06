import { useState } from 'react';

interface Job {
  company: string;
  title: string;
  duration: string;
  description: string[];
  url?: string;
}

const jobs: Job[] = [
  {
    company: 'Current Company',
    title: 'Senior Full-Stack Engineer',
    duration: 'January 2022 - Present',
    url: 'https://company.com',
    description: [
      'Lead development of cloud-native applications serving 100k+ users, utilizing React, Next.js, and Azure infrastructure',
      'Architected and implemented AI-powered features using OpenAI GPT-4 and LangChain, improving user engagement by 40%',
      'Mentored junior developers and established best practices for code quality, testing, and deployment pipelines',
      'Collaborated with product and design teams to deliver scalable solutions on time and within budget',
    ],
  },
  {
    company: 'Previous Startup',
    title: 'Full-Stack Developer',
    duration: 'June 2020 - December 2021',
    url: 'https://startup.com',
    description: [
      'Built RESTful APIs and microservices using Node.js, Express, and PostgreSQL with Prisma ORM',
      'Developed responsive web applications with React, TypeScript, and Tailwind CSS',
      'Implemented CI/CD pipelines with GitHub Actions, Docker, and Kubernetes for automated deployments',
      'Optimized database queries and application performance, reducing load times by 50%',
    ],
  },
  {
    company: 'Tech Consultancy',
    title: 'Software Engineer',
    duration: 'January 2019 - May 2020',
    url: 'https://consultancy.com',
    description: [
      'Delivered custom web solutions for diverse clients across healthcare, finance, and e-commerce sectors',
      'Integrated third-party APIs and payment gateways including Stripe, PayPal, and Square',
      'Conducted code reviews and implemented automated testing strategies with Jest and Cypress',
      'Collaborated in agile teams using Scrum methodologies for iterative development',
    ],
  },
];

export default function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const activeJob = jobs[activeTab];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="Job tabs"
        className="flex md:flex-col overflow-x-auto md:overflow-visible border-b-2 md:border-b-0 md:border-l-2 border-[var(--color-border)]"
      >
        {jobs.map((job, index) => (
          <button
            key={job.company}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveTab(index)}
            className={`
              px-5 py-3 text-left whitespace-nowrap font-medium transition-all duration-200
              border-b-2 md:border-b-0 md:border-l-2
              ${
                activeTab === index
                  ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/5'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-accent-primary)]'
              }
            `}
          >
            {job.company}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="flex-1 min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-1">
          {activeJob.title}
          {activeJob.url && (
            <a
              href={activeJob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-primary)] hover:underline ml-2"
            >
              @ {activeJob.company}
            </a>
          )}
          {!activeJob.url && (
            <span className="text-[var(--color-accent-primary)]"> @ {activeJob.company}</span>
          )}
        </h3>

        <p className="font-mono text-sm text-[var(--color-text-muted)] mb-6">
          {activeJob.duration}
        </p>

        <ul className="space-y-4">
          {activeJob.description.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-[var(--color-text-secondary)]">
              <span className="text-[var(--color-accent-primary)] mt-1 flex-shrink-0">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
