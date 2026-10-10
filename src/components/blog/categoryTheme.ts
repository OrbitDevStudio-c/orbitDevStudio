import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BrainCircuit, Braces, ChartNoAxesColumn, CodeXml, Gauge, Palette, PenTool, ShoppingBag, Tag, TrendingUp, Zap, Cpu } from 'lucide-react';
import type { BlogCategory } from '../../data/blog';

export interface CategoryTheme {
  /** Large symbol shown on generated covers. */
  icon: LucideIcon;
  /** Small secondary symbol shown alongside it. */
  accentIcon: LucideIcon;
  /** Accent used in dark mode (brighter). */
  dark: string;
  /** Accent used in light mode (deeper, for contrast on white). */
  light: string;
  /** Second gradient stop for generated covers. */
  partner: string;
}

export const CATEGORY_THEME: Record<BlogCategory, CategoryTheme> = {
  'Web Development': { icon: CodeXml, accentIcon: Braces, dark: '#4f9bff', light: '#1660d6', partner: '#00d9ff' },
  'UI/UX': { icon: PenTool, accentIcon: Palette, dark: '#a78bfa', light: '#6c2bff', partner: '#ec4899' },
  Business: { icon: ChartNoAxesColumn, accentIcon: TrendingUp, dark: '#f6b73c', light: '#b45309', partner: '#f97316' },
  'E-commerce': { icon: ShoppingBag, accentIcon: Tag, dark: '#f472b6', light: '#be185d', partner: '#a78bfa' },
  Technology: { icon: BrainCircuit, accentIcon: Cpu, dark: '#22d3ee', light: '#0e7490', partner: '#1677ff' },
  'Website Optimization': { icon: Gauge, accentIcon: Zap, dark: '#34d399', light: '#047857', partner: '#22d3ee' },
};

/**
 * CSS custom properties consumed by `text-[var(--cat)] light:text-[var(--cat-l)]`
 * style utilities, so a single element can carry a per-category accent in both themes.
 */
export function categoryVars(category: BlogCategory): CSSProperties {
  const t = CATEGORY_THEME[category];
  return { '--cat': t.dark, '--cat-l': t.light } as CSSProperties;
}
