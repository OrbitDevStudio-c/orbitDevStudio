import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import GlobalFigure from '../hero-figures/GlobalFigure';
import { INQUIRY_ID } from '../../data/globalSolutions';

export default function GlobalHero() {
  return (
    <PageHero
      eyebrow="Global Solutions"
      title="Your Vision. Our Engineering."
      highlight="Worldwide Impact."
      description={
        <>
          <strong className="mb-3 block text-lg font-semibold text-white light:text-slate-900">
            Building Digital Solutions for Businesses Everywhere.
          </strong>
          From ambitious startups to established enterprises, we help businesses worldwide design, develop and scale technology that moves them forward.
        </>
      }
      actions={
        <>
          <a
            href={`#${INQUIRY_ID}`}
            data-track="global_hero_start_project"
            data-track-location="global_solutions_hero"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(INQUIRY_ID)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold"
          >
            Start Your Project
            <ArrowRight size={18} />
          </a>
          <Link
            to="/portfolio"
            data-track="global_hero_explore_work"
            data-track-location="global_solutions_hero"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-8 py-3.5 text-[14px] font-bold text-white transition-all hover:border-white/30 hover:bg-white/[0.04] light:border-slate-300 light:text-slate-900 light:hover:bg-slate-50"
          >
            Explore Our Work
          </Link>
        </>
      }
      figure={<GlobalFigure />}
    />
  );
}
