import { ArrowRight } from 'lucide-react';
import PageHero from './PageHero';
import HireFigure from '../hero-figures/HireFigure';

export default function HireHero() {
  return (
    <PageHero
      eyebrow="Hire Dedicated Talent"
      title="Scale your team with"
      highlight="elite engineering."
      description="Augment your capabilities with senior developers, architects, and designers who integrate seamlessly into your workflow. Flexible engagement models designed to accelerate your product roadmap without the hiring overhead."
      actions={
        <button
          onClick={() => {
            document.getElementById('hire-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl font-bold text-[14px] px-8 py-3.5"
        >
          Hire Developers Now
          <ArrowRight size={18} />
        </button>
      }
      figure={<HireFigure />}
    />
  );
}
