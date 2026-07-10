import { motion } from 'framer-motion';
import { techCategories as categories } from '../../data/techStack';


export default function TechCategories() {
  return (
    <section className="bg-navy px-6 py-24 text-white md:px-12 lg:px-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">Stack Coverage</p>
          <h2 className="text-3xl font-bold tracking-normal md:text-5xl">Everything needed to ship and scale.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
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
              className="card-dark p-5 transition-colors hover:border-accent/40"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
