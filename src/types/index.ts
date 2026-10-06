// Portfolio types - mirrors the shape of data in portfolio.ts

export interface ArchitectureStep {
  label: string;
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  featured: boolean;
  highlight: boolean;
  problem?: string;
  solution?: string;
  architecture: ArchitectureStep[];
  agents: string[];
  tools: string[];
  technologies: string[];
  github: string | null;
  demo: string | null;
  status: string;
  source: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
  technologies: string[];
  featured: boolean;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  url: string;
  stars: number;
  updatedAt: string;
}
