import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INQUIRY_ID, showcaseSlugs } from '../../data/globalSolutions';
import { getProjectBySlug, type Project } from '../../data/projects';

function Preview({ p }: { p: Project }) {
  if (p.screenshot) {
    return (
      <img
        src={p.screenshot.src}
        alt={p.screenshot.alt}
        width={p.screenshot.width}
        height={p.screenshot.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      {p.logo && (
        <img src={p.logo.src} alt={p.logo.alt} width={96} height={96} loading="lazy" decoding="async" className="h-24 w-24 object-contain" />
      )}
    </div>
  );
}

export default function GlobalWork() {
  const projects = showcaseSlugs.map((s) => getProjectBySlug(s)).filter((p): p is Project => !!p);
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Proof of work</span>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl light:text-slate-900">
              Products we have <span className="text-gradient">designed and built</span>
            </h2>
          </div>
          <Link
            to="/portfolio"
            data-track="global_work_all"
            data-track-location="global_work"
            className="inline-flex w-fit items-center gap-2 text-[13px] font-bold text-accent hover:text-[#00d9ff] light:hover:text-[#0891b2]"
          >
            Explore Our Work <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
            >
              <Link
                to={`/case-studies/${p.slug}`}
                data-track={`global_case_${p.slug}`}
                data-track-location="global_work"
                className="card-dark group flex h-full flex-col overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-white/5 light:border-slate-200">
                  <Preview p={p} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#00d9ff] light:text-[#0891b2]">{p.industry}</span>
                  <h3 className="mb-2 flex items-center justify-between text-[16px] font-bold text-white light:text-slate-900">
                    {p.title}
                    <ArrowUpRight size={16} className="text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  </h3>
                  <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-400 light:text-slate-600">{p.caseStudy.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="mb-5 text-xl font-semibold text-white light:text-slate-900">Have a project in mind? Let’s build it together.</p>
          <a
            href={`#${INQUIRY_ID}`}
            data-track="global_work_get_consultation"
            data-track-location="global_work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(INQUIRY_ID)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold"
          >
            Get a Free Consultation
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
