export type RoleId = 'backend' | 'it-support' | 'frontend' | 'software-security';

export interface InteractiveKeyword {
  word: string;
  category: string;
  detail: string;
  metric?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  architectureNotes: string[];
  keyOutcomes: string[];
  techStack: string[];
  image: string;
  imageFallbackAlt: string;
  githubUrl: string;
  demoUrl: string;
  category: string;
  featured: boolean;
  metricBadge?: { label: string; value: string };
}

export interface SkillItem {
  name: string;
  proficiency: number; // percentage
  category: string;
  experience: string;
  highlighted?: boolean;
  context: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Certified';
  description: string;
  highlights: string[];
  verificationCode?: string;
  roleAssociated: RoleId;
}

export interface ThemeConfig {
  bgClass: string;
  canvasHex: string;
  surfaceClass: string;
  cardBorderClass: string;
  accentHex: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
  gradientBadge: string;
  ambientLight: string;
}

export interface RoleData {
  id: RoleId;
  label: string;
  shortLabel: string;
  navLabel: string;
  badge: string;
  tagline: string;
  editorialLead: string;
  heroTitle: string;
  heroItalic: string;
  heroSubtitle: string;
  heroKeywords: InteractiveKeyword[];
  philosophy: string;
  metrics: { label: string; value: string; context: string }[];
  theme: ThemeConfig;
  skillCategories: { title: string; skills: SkillItem[] }[];
  projects: Project[];
  credentials: Credential[];
  simulatorType: 'api-bench' | 'network-diag' | 'spring-physics' | 'packet-defense';
}
