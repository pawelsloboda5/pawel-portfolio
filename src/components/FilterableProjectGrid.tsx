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
      {filtered.length === 0 ? (
        <p className="text-center text-[var(--color-text-muted)] font-mono text-sm py-12">
          No projects in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              externalUrl={project.externalUrl}
              delay={i * 50}
            />
          ))}
        </div>
      )}
      {hasMore && !showAll && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="font-mono text-sm text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)] rounded px-7 py-4 hover:bg-[rgba(167,139,250,0.1)] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
}
