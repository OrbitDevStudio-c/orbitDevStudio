import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import TechFigure from '../hero-figures/TechFigure';

export default function TechHero() {
  return (
    <PageHero
      eyebrow="Technologies"
      title="Practical tech stacks for"
      highlight="serious digital products."
      description="We choose the right languages, frameworks, databases, and cloud tools for each product instead of forcing every idea into one template. Built for speed, scale, and uncompromising security."
      actions={
        <>
          <Link
            to="/hire"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-semibold"
          >
            Plan My Stack
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3.5 font-semibold text-[#94A3B8] transition-colors hover:bg-white/[0.05] hover:text-white light:hover:text-slate-900"
          >
            View Work
          </Link>
        </>
      }
      figure={<TechFigure />}
    />
  );
}
