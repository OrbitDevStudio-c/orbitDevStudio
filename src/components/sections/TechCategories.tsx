import { motion } from 'framer-motion';
import { Brain, Cloud, Code2, Database, GitBranch, LayoutTemplate, ShieldCheck, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type TechItem = {
  name: string;
  detail: string;
  Icon: LucideIcon;
};

const categories: TechItem[] = [
  { name: 'React & Next.js', detail: 'Modern interfaces, dashboards, portals, and storefronts.', Icon: LayoutTemplate },
  { name: 'Node.js & APIs', detail: 'Fast, maintainable services for product workflows.', Icon: Code2 },
  { name: 'Python & Django', detail: 'Reliable backend systems, automation, and data-heavy apps.', Icon: Brain },
  { name: 'Databases', detail: 'PostgreSQL, MongoDB, Redis, and well-modeled data layers.', Icon: Database },
  { name: 'Cloud & DevOps', detail: 'AWS, Docker, deployment pipelines, and observability.', Icon: Cloud },
  { name: 'Mobile Ready', detail: 'Responsive web builds and React Native product paths.', Icon: Smartphone },
  { name: 'Version Control', detail: 'Git-based collaboration, reviews, and release discipline.', Icon: GitBranch },
  { name: 'Security Basics', detail: 'Auth, permissions, validation, and production hardening.', Icon: ShieldCheck },
];

export default function TechCategories() {
  return (
    <section className="bg-[#101A2D] px-6 py-16 md:py-20 text-white md:px-12 lg:px-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#4F8CFF]">Stack Coverage</p>
          <h2 className="text-3xl font-bold tracking-normal md:text-5xl">Everything needed to ship and scale.</h2>
          <p className="mt-5 text-lg leading-8 text-[#94A3B8]">
            From UI engineering to databases and cloud deployment, the stack is selected around your product goals, budget, team, and future roadmap.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, detail, Icon }, index) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="card-dark p-5 transition-colors hover:border-white/20"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF]">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7D2E4]">{detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
