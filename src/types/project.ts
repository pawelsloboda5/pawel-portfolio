/**
 * Featured Project Type Definition
 * Represents the structure of a featured project for portfolio display
 */

export interface FeaturedProject {
  /** Unique identifier for the project */
  id: string;
  
  /** Display title of the project */
  title: string;
  
  /** Brief tagline or subtitle */
  tagline: string;
  
  /** Main description of the project (supports HTML for inline links) */
  description: string;
  
  /** Array of technology/tool names used in the project */
  techStack: string[];
  
  /** Live project URL */
  liveUrl: string;
  
  /** GitHub repository URL (optional) */
  githubUrl?: string;
  
  /** Project image URL or path (optional, defaults to gradient if not provided) */
  imageUrl?: string;
  
  /** Image gradient colors for fallback display */
  imageGradient?: {
    from: string;
    to: string;
  };
  
  /** Metrics and outcomes (optional, for extended display) */
  outcomes?: string[];
  
  /** Key features (optional, for extended display) */
  features?: string[];
}

export type FeaturedProjectsList = FeaturedProject[];
