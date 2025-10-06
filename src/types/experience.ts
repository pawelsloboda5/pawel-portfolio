/**
 * Experience Type Definition
 * Represents the structure of a work experience entry
 */

export interface Experience {
  /** Company or organization name */
  company: string;
  
  /** Job title */
  title: string;
  
  /** Employment duration (e.g., "May 2025 - August 2025") */
  duration: string;
  
  /** Location of work */
  location: string;
  
  /** Array of achievement/responsibility descriptions */
  description: string[];
  
  /** Company website URL (optional) */
  url?: string;
}

export type ExperienceList = Experience[];
