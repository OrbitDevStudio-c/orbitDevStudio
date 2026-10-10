import { motion } from 'framer-motion';

// Products from the portfolio that have a brand logo.
const BRANDS: { name: string; logo: string }[] = [
  { name: 'BookVerse', logo: '/projects/bookverse-logo-96.webp' },
  { name: 'KnowledgeVoice', logo: '/projects/knowledgevoice-logo-96.webp' },
  { name: 'RecruitIQ', logo: '/projects/recruitiq-logo-96.webp' },
  { name: 'Orbit Food', logo: '/projects/orbitfood-logo.webp' },
  { name: 'ProBuild ERP', logo: '/projects/probuild-logo-96.webp' },
];

export default function HomeTrustedBy() {
  return (
    <section aria-labelledby="trusted-heading" className="bg-navy-deep relative border-y border-white/[0.06] light:border-slate-200 py-12 md:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          id="trusted-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 light:text-slate-500 mb-8"
        >
          Brands &amp; products we&apos;ve designed and built
        </motion.p>

        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {BRANDS.map((brand, i) => (
            <motion.li
              key={brand.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-white/45 transition-colors hover:text-white light:text-slate-400 light:hover:text-slate-900"
            >
              <img
                src={brand.logo}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                className="h-7 w-7 rounded-md object-contain opacity-60 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
              />
              {brand.name}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
