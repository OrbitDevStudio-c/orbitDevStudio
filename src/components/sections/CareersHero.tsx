import { ArrowDown } from 'lucide-react';
import PageHero from './PageHero';
import CareersFigure from '../hero-figures/CareersFigure';

export default function CareersHero() {
  const scrollToOpenings = () => {
    document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageHero
      eyebrow="Join Our Orbit"
      title="Build the"
      highlight="future with us."
      description="We are always on the lookout for passionate engineers, creative designers, and visionary thinkers who want to push the boundaries of digital product development."
      actions={
        <button
          onClick={scrollToOpenings}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-full font-bold text-[14px] px-8 py-4"
        >
          View Open Positions
          <ArrowDown size={18} className="animate-bounce mt-1" />
        </button>
      }
      figure={<CareersFigure />}
    />
  );
}
