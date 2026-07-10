import { Brain, Cloud, Code2, Database, GitBranch, LayoutTemplate, ShieldCheck, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';
import { SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, SiTypescript, SiPython } from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';

export interface TechCategory {
  name: string;
  detail: string;
  Icon: LucideIcon;
}

export interface TechMarqueeItem {
  name: string;
  Icon: IconType;
}

export const techCategories: TechCategory[] = [
  { name: 'React & Next.js', detail: 'Modern interfaces, dashboards, portals, and storefronts.', Icon: LayoutTemplate },
  { name: 'Node.js & APIs', detail: 'Fast, maintainable services for product workflows.', Icon: Code2 },
  { name: 'Python & Django', detail: 'Reliable backend systems, automation, and data-heavy apps.', Icon: Brain },
  { name: 'Databases', detail: 'PostgreSQL, MongoDB, Redis, and well-modeled data layers.', Icon: Database },
  { name: 'Cloud & DevOps', detail: 'AWS, Docker, deployment pipelines, and observability.', Icon: Cloud },
  { name: 'Mobile Ready', detail: 'Responsive web builds and React Native product paths.', Icon: Smartphone },
  { name: 'Version Control', detail: 'Git-based collaboration, reviews, and release discipline.', Icon: GitBranch },
  { name: 'Security Basics', detail: 'Auth, permissions, validation, and production hardening.', Icon: ShieldCheck },
];

export const techStack: TechMarqueeItem[] = [
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'React', Icon: SiReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Python', Icon: SiPython },
  { name: 'Java', Icon: FaJava },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'AWS', Icon: FaAws },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Express', Icon: SiExpress },
];
