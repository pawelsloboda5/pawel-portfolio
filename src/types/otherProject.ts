/**
 * Other Project Type Definition
 * Represents the structure of a smaller noteworthy project for portfolio display
 */

import type { ProjectCategory } from './projectCategory';

export interface OtherProject {
  /** Unique identifier for the project */
  id: string;

  /** Display title of the project */
  title: string;

  /** Brief description of the project */
  description: string;

  /** Array of technology/tool names used in the project */
  techStack: string[];

  /** GitHub repository URL (optional) */
  githubUrl?: string;

  /** Live project URL or demo link (optional) */
  externalUrl?: string;

  /** Project category for filtering */
  category: ProjectCategory;
}

export type OtherProjectsList = OtherProject[];
