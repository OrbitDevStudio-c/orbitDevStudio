import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import AboutFigure from '../hero-figures/AboutFigure';

export default function AboutHero() {
  return (
    <PageHero
      eyebrow="Who We Are"
      title="Engineering digital"
      highlight="futures since 2023."
      description="OrbitDevStudio is a premium software engineering agency dedicated to transforming ambitious ideas into scalable, high-performance digital realities. We don't just write code; we build the foundational technology that powers next-generation businesses."
      actions={
        <Link
          to="/portfolio"
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3 text-[15px] font-semibold"
        >
          See Our Work
          <ArrowRight size={18} />
        </Link>
      }
      figure={<AboutFigure />}
    />
  );
}
