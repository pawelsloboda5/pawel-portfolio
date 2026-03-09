# Portfolio Expansion — Execution Handoff Prompt

Copy everything below this line into a new Claude Code session:

---

Use /superpowers:subagent-driven-development to execute the implementation plan at `docs/plans/2026-03-09-portfolio-projects-expansion.md` task-by-task.

## Context

This is an **Astro 5 + React 19 + Tailwind CSS 4** portfolio website at `C:\Users\Pawel Sloboda\Desktop\portfolio-website-2\pawel-portfolio`.

### Architecture (critical — read before coding)

- **All project data is hardcoded TypeScript** in `src/data/` — no CMS, no content collections
- `src/data/featuredProjects.ts` → `FeaturedProject[]` (currently 3 entries)
- `src/data/otherProjects.ts` → `OtherProject[]` (currently 6 entries)
- `src/data/links.ts` → centralized URLs (`companyLinks`, `projectGithubLinks`, `socialLinks`)
- `src/types/project.ts` → `FeaturedProject` interface
- `src/types/otherProject.ts` → `OtherProject` interface
- `src/components/FeaturedProjects.astro` → renders featured projects (alternating grid layout)
- `src/components/OtherProjects.astro` → renders other projects grid
- `src/components/ProjectCard.tsx` → React card component for "other" projects
- CSS variables in `src/styles/global.css` (purple theme: `--color-accent-primary: #a78bfa`)
- Site deploys via Vercel with `output: server` mode

### What the plan does (9 tasks)

**Goal:** Expand from 9 projects to 24 projects.

1. Update `links.ts` with new URLs (CyberCane GitHub, CPRMetro, FreemanFiling)
2. Enrich existing SIE Wellness featured entry with richer description/features
3. Add 3 NEW featured projects: **MissionIndex**, **FieldLiaison**, **FreemanFiling** (with gradient fallbacks since no images)
4. Add 12 NEW "other" projects (Seekle, CyberCane, CPR Metro, Algo Trading Bot, Cursor Prompt+, Healthcare Pricing Pipeline, Medicaid Form Scraper, SIE Data Pipeline, Faceless Automation, Apicus Scrape, O*NET Pipeline, LinkedIn Alumni Scraper)
5. Add new links to `links.ts` (combined with task 1 — can merge)
6. Add category filter system: new `ProjectCategory` type, add `category` field to `OtherProject`, create `ProjectFilter.tsx` and `FilterableProjectGrid.tsx` React components, update `OtherProjects.astro`
7. Add "Show More" toggle to `FilterableProjectGrid.tsx` (show 6 by default)
8. Update chatbot data (`src/data/chatbotData.ts`) with new project info
9. Verify full build + visual check

### Important notes

- The plan has **complete code for every task** — copy it from the plan file, don't improvise
- Featured projects without images use `imageGradient` fallback (already supported by FeaturedProjects.astro)
- The `ProjectCard.tsx` component already accepts the `OtherProject` interface — check its props before wrapping it in the new `FilterableProjectGrid`
- Read each file before editing — the plan was written against specific line numbers that may have shifted
- Commit after each task
- Run `npm run build` (not just tsc) to verify — the Astro build catches things TypeScript doesn't
- The chatbot data file (`chatbotData.ts`) needs to be read first to understand its structure before updating

### Execution order

Tasks 1+5 can merge (both touch `links.ts`). Then 2, 3, 4 sequentially (all touch data files). Then 6+7 (filter system). Then 8 (chatbot). Then 9 (verify).

Start by reading the full plan file, then dispatch subagents per task.
