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
    <div className="flex flex-wrap gap-3 justify-center mb-10" style={{ touchAction: 'manipulation' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => { setActive(cat); onFilter(cat); }}
          className={`px-4 py-2 rounded-full text-sm font-mono transition-colors duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] ${
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
