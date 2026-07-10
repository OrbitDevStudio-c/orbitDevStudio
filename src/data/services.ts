export interface ServiceData {
  id: string;
  iconName: string; // Lucide icon name: 'Monitor', 'Smartphone', 'Lightbulb', 'TerminalSquare', 'Cpu', 'LineChart', 'ShieldCheck'
  title: string;
  desc: string;
  className: string;
  technologies?: string[];
  stats?: { label: string; value: string }[];
  badge?: string;
  platforms?: string[];
}

export const services: ServiceData[] = [
  {
    id: "web",
    iconName: "Monitor",
    title: "Web Application Engineering",
    desc: "Our engineers deliver full-stack web applications — from SaaS dashboards and customer portals to complex e-commerce platforms. Architected for performance, accessibility, and long-term maintainability.",
    className: "md:col-span-2",
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind']
  },
  {
    id: "mobile",
    iconName: "Smartphone",
    title: "Mobile Development",
    desc: "We build high-performance native and cross-platform apps that combine pixel-perfect design with blazing-fast performance.",
    className: "md:col-span-1",
    platforms: ['iOS', 'And']
  },
  {
    id: "ux",
    iconName: "Lightbulb",
    title: "UX/UI & Product Design",
    desc: "We craft intuitive digital experiences through research-backed UX strategy, modern UI design systems, and interactive prototyping.",
    className: "md:col-span-1"
  },
  {
    id: "custom",
    iconName: "TerminalSquare",
    title: "Custom Software Solutions",
    desc: "We develop bespoke software systems precisely aligned with your workflows — from automation engines to enterprise data pipelines. Built to scale, maintained to last.",
    className: "md:col-span-2",
    stats: [
      { label: "Systems Shipped", value: "150+" },
      { label: "Tech Debt", value: "0" }
    ]
  },
  {
    id: "ai",
    iconName: "Cpu",
    title: "AI & Emerging Tech",
    desc: "Integrate intelligent automation and LLM capabilities into your products.",
    className: "md:col-span-1"
  },
  {
    id: "growth",
    iconName: "LineChart",
    title: "Growth Engineering",
    desc: "Data-driven strategies that increase traffic and accelerate revenue.",
    className: "md:col-span-1"
  },
  {
    id: "qa",
    iconName: "ShieldCheck",
    title: "QA & Testing",
    desc: "Rigorous automated and manual validation for flawless releases.",
    className: "md:col-span-1",
    badge: "99.9% Reliability"
  }
];
