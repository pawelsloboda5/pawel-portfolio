import ScrollReveal from './ScrollReveal';
import { socialLinks } from '../data/links';

/**
 * ForkPortfolio Component
 * Minimalistic design with clean typography and improved readability
 * Highlights the Astro + React tech stack choice over Next.js
 */
export default function ForkPortfolio() {
  return (
    <ScrollReveal variant="fade" duration={600} threshold={0.15}>
      <div>
        {/* Content */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Fork This Portfolio
          </h2>

          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
            Like what you see? This portfolio is built with <span className="font-semibold text-[var(--color-text-primary)]">Astro + React</span> and is open source for you to fork, clone, and customize.
          </p>

          {/* Astro vs Next.js Highlight Box */}
          <div className="mb-8 p-5 rounded-lg bg-[var(--color-background-secondary)]/30">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">Why Astro over Next.js?</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
              For a mostly static portfolio site like this, Astro's <strong className="text-[var(--color-text-primary)]">island architecture</strong> is perfect. Only the interactive bits load JavaScript, you sprinkle <code className="text-xs bg-[var(--color-background-secondary)]/50 px-1.5 py-0.5 rounded font-mono text-[var(--color-accent-primary)]">client:*</code> where you want interactivity, and everything else is pure HTML. 
              Next.js is great for heavy backend and interactive apps, but for content sites? Astro loads <strong className="text-[var(--color-text-primary)]">way faster</strong>.
            </p>
            
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-mono">
                Astro 4+
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-mono">
                React Islands
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-mono">
                TypeScript
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-mono">
                Tailwind CSS
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href={socialLinks.portfolioRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] px-8 py-3 rounded-lg font-medium text-base hover:bg-[var(--color-accent-primary)]/10 transition-all duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}
