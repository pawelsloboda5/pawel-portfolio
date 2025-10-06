import { useState, useEffect, useRef } from 'react';
import { experiences } from '../data/experiences';
import type { Experience } from '../types/experience';

const jobs: Experience[] = experiences;

export default function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeJob = jobs[activeTab];

  // Measure and set the maximum height across all tab panels
  useEffect(() => {
    const measureHeights = () => {
      // Temporarily make all content visible to measure their heights
      const heights = contentRefs.current.map((ref) => {
        if (!ref) return 0;
        return ref.offsetHeight;
      });

      // Find the maximum height
      const maxHeight = Math.max(...heights, 300); // Minimum 300px
      setContainerHeight(maxHeight);
    };

    // Measure after initial render
    measureHeights();

    // Recalculate on window resize
    const handleResize = () => {
      measureHeights();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

      {/* Tab Panel Container with Fixed Height */}
      <div
        ref={containerRef}
        className="flex-1 relative"
        style={{
          height: containerHeight ? `${containerHeight}px` : 'auto',
          minHeight: '300px',
          transition: 'height 0.3s ease-in-out',
        }}
      >
        {jobs.map((job, index) => (
          <div
            key={job.company}
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            aria-hidden={activeTab !== index}
            className={`
              absolute inset-0 transition-opacity duration-300
              ${activeTab === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
            style={{
              // Keep all panels in DOM for measurement but hide inactive ones
              visibility: containerHeight === null || activeTab === index ? 'visible' : 'hidden',
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-1">
              {job.title}
              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-accent-primary)] hover:underline ml-2"
                >
                  @ {job.company}
                </a>
              )}
              {!job.url && (
                <span className="text-[var(--color-accent-primary)]"> @ {job.company}</span>
              )}
            </h3>

            <p className="font-mono text-sm text-[var(--color-text-muted)] mb-6">
              {job.duration}
            </p>

            <ul className="space-y-4">
              {job.description.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-accent-primary)] mt-1 flex-shrink-0">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
